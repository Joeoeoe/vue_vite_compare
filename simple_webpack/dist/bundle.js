(function(modules){
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
            require('./src/index.js')
        })({"./src/index.js":{"dependencies":{},"code":"\"use strict\";\n\nconsole.log('myWebpack!');"}})