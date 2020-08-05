const fs = require('fs');
const path = require('path');
const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
    const { request: { url } } = ctx;
    console.log(url);
    if (url === "/") {
        ctx.type = "text/html";
        ctx.body = fs.readFileSync('./index.html', 'utf-8');
    }else if(url.endsWith('.js')){
        const p = path.resolve(__dirname, url.slice(1));
        ctx.type = 'application/javascript';
        const content = fs.readFileSync(p, 'utf-8');
        ctx.body = content;
    }
});

app.listen(3002, () => {
    console.log('3002端口开启');
})