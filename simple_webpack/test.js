const path = require('path');
const {resolve} = path;
const Webpack = require('./myWebpack');

const option = {
    entry: './src/index.js',
    output:{
        path:resolve(__dirname, './dist'),
        filename: 'bundle.js',
    }
};

new Webpack(option).run();