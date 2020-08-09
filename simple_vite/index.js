const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const compilerSfc = require('@vue/compiler-sfc') // .vue 将vue组件编译为js
const compilerDom = require('@vue/compiler-dom') // 模板

const app = new Koa();

app.use(async ctx => {
    const { request: { url, query } } = ctx;
    if (url === "/") {
        ctx.type = "text/html";
        let content = fs.readFileSync('./index.html', 'utf-8');
        content = content.replace('<script', `
          <script>
            window.process = {env: {NODE_ENV: 'dev'}}
          </script>
          <script
        `);
        ctx.body = content;
    } else if (url.endsWith('.js')) {
        const p = path.resolve(__dirname, url.slice(1));
        ctx.type = 'application/javascript';
        const content = fs.readFileSync(p, 'utf-8');
        ctx.body = rewriteImport(content);
    } else if (url.startsWith('/@modules/')) {
        const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''));
        const module = require(prefix + '/package.json').module;
        const p = path.resolve(prefix, module);
        const code = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        ctx.body = rewriteImport(code);
    } else if (url.indexOf('.vue') > -1) {
        console.log(query);
        const p = path.resolve(__dirname, url.split('?')[0].slice(1));
        const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8')); // 将vue组件编译为js

        if (!query.type) { // vue组件编译为js
            ctx.type = 'application/javascript';
            ctx.body = `
            ${rewriteImport(descriptor.script.content.replace('export default', 'const _script = '))}
            import {render as _render} from "${url}?type=template" // 获取template内容
            _script.render = _render
            export default _script
            `
        }
        else if (query.type === 'template'){ // template解析为render
            const template = descriptor.template;
            const render = compilerDom.compile(template.content, {mode: "module"}).code;
            ctx.type = 'application/javascript';
            ctx.body = rewriteImport(render);
        }
    }
});

app.listen(3002, () => {
    console.log('3002端口开启');
});

function rewriteImport(content) {
    return content.replace(/from ['"]([^'"]+)['"]/g, function (s0, s1) {
        // 不是. ./ / 开头均为模块导入
        if (s1[0] !== '.' && s1[1] !== '/') {
            return `from '/@modules/${s1}'`;
        } else {
            return s0;
        }
    })
}