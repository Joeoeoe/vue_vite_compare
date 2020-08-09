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
        })({
            "./src/index.js":{"dependencies":{"./moduleA.js":"./src\\moduleA.js"},"code":"\"use strict\";\n\nvar _moduleA = _interopRequireDefault(require(\"./moduleA.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log('myWebpack!');\n(0, _moduleA[\"default\"])();"},
        "./src\\moduleA.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\nfunction _default() {\n  console.log(\"I am moduleA\");\n}"}})