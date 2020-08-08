const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser'); // 解析为AST
const traverse = require('@babel/traverse').default; // 遍历AST
const { transformFromAst } = require('@babel/core'); // ES6转换ES5

module.exports = class Webpack {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modulesArr = [];
    }
    run() { // 启动编译
        const info = this.build(this.entry);
        this.modulesArr.push(info);
        for (let i = 0; i < this.modulesArr.length; i++) {
            // 解析所有依赖项
            const item = this.modulesArr[i];
            const { dependencies } = item;
            if (dependencies) {
                for (let j in dependencies) {
                    this.modulesArr.push(this.build(dependencies[j]));
                }
            }
        }

        // 数组转对象
        const obj = {};
        this.modulesArr.forEach((item) => {
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code
            }
        });

        this.emitFile(obj);
    }

    build(entryFile){
        const conts = fs.readFileSync(entryFile, 'utf8');
        const ast = parser.parse(conts, { // 解析为AST
            sourceType: 'module'
        });
        console.log(ast);

        const dependencies = {};
        // 遍历AST  
        // TODO 不懂，盲猜是设置路径
        traverse(ast, {
            ImportDeclaration({node}){
                const newPath = './' + path.join(path.dirname(entryFile), node.source.value);
                dependencies[node.source.value] = newPath;
            }
        });

        const {code} = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });

        return{
            entryFile,
            dependencies,
            code
        };
    }

    emitFile(code){
        const filePath = path.join( this.output.path, this.output.filename);
        console.log(__dirname);
        const newCode = JSON.stringify(code);
        const bundle = `(function(modules){
            function require(moduleId){
                function localRequire(relativePath){
                    return require(modules[moduleId].dependencies[relativePath])
                }
                var exports = {};

                (function (require, exports, code){
                    eval(code)
                })(localRequire, exports, modules[moduleId].code)
                return exports;
            }
            require('${this.entry}')
        })(${newCode})`;
        console.log(bundle);
        fs.writeFileSync(filePath, bundle, 'utf-8');
    }
}