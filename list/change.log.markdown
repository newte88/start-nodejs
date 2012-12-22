#changelog

##目前已知问题

* Nodejs 服务器, 在有文件修改时, 需要重新启动.
* Nodejs 服务器和其它服务器不能共存.
* 站点没加载 CSS 和 JavaScript 文件.
* 图片文件没做详细处理. 仅支持 png.
* 需要加载 watch 模块, 让 list 目录存在更新时, 自动更新 `index.markdown` 文件.
* 服务器中 route 模块, 写的相当不友好, 需要改善.
* 对 JavaScript 文件进行合理的模块化拆分.
* 使用的 Markdown.js 支持比较差.


##bug
* 文件名不能存在空格等特殊符号


##需知

* 站点没使用 *Express* 等框架.
* 使用 **jQuery** 中 Deferred等模块.
    1. Callbacks 模块 - Deferred 模块依赖它.
    2. When 扩展依赖 Deferred 模块 - 实现并行.
    3. queue/dequeue 模块 - 实现串行.


