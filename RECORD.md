# 记录

## 8.4
对比vite与cli打包后的区别，基本了解如何解析文件。将script标签抽出来，template内容则使用render函数

新疑问：Shadow DOM、 document.adoptedStyleSheets 


# 8.7
大概知道webpack原理了，先跟着写一个简单的，后续再看源码

# 8.8
简单webpack完成，明天结合文章进一步分析理解，然后理解HMR。接下来继续Vite

# 8.9
webpack打包原理为自身模拟一个require函数，通过eval函数执行各个文件的字符串代码，如此便相当于把多个文件集成到一个js文件中（eval执行的js字符串可视为一个文件）。

大致知道了webpack HMR 原理，但只是刚刚开始，现在开始vite。

vite与vue搭配完成，接下来解析CSS，CSS完毕后就自己看源码总结了




# 参考学习文章
1. [前端新工具--vite从入门到实战（一）](https://zhuanlan.zhihu.com/p/149033579)
2. [Vite 原理浅析](https://molunerfinn.com/learn-vite/)
3. [讲真的，通过这个例子，我知道 vite 为什么比 webpack 快了](https://juejin.im/post/6854573217333149703)
4. 等看尤大评论，自己分析
5. [替代 webpack？带你了解 snowpack 原理，你还学得动么](https://www.zhihu.com/search?type=content&q=snowpack%20vite)
6. [vite 如何做到让 vue 本地开发更快速？](https://developer.aliyun.com/article/761551)
7. [webpack4主流程源码阅读，以及动手实现一个webpack](https://zhuanlan.zhihu.com/p/150070163)
8. [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
9. [vite 如何做到让 vue 本地开发更快速？](https://developer.aliyun.com/article/761551)