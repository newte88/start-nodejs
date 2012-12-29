#What's new


##更新:

* Nodejs 服务器, 在有文件修改时, 需要重新启动. - 使用 supervisor 模块解决.
* 使用 Markdown.Converter.js 替换 markdown-js, 解决对 markdown 支持差问题.
* 对图片文件支持. - 使用 mime 模块.
* 对 *css* 和 **js** 文件支持.
* watch 模块支持, 此时自动更新 index 文件.
* 修正图片等二进制读取错误问题. 之前使用了 ***utf8*** 读取.
* 对 `JavaScript` 文件进行拆分.
* 文件支持 `markdown` 多种格式. ( `.markdown, .md` 等 )
* 文档中如果存在 `JavaScript` 代码, 会直接执行. - 在 `markdown` 下为正确.


##已知问题

* Nodejs 服务器和其它服务器不能共存.
* 服务器中 route 模块, 写的相当不友好, 需要改善.
* 对 code 的高亮支持.
* 向 `HTML` 标签中添加 `Attritute`
* 对 `uri.js` 做单元测试 + 对 `markdown app` 做单元测试.
* 使用事件机制绑定返回状态和返回页面.
* 怎么在 Node.js 中让多个域名共存, 并且指向不同内容.
* 支持 rewrite. 
* 支持 302/301. `response.writeHead( 302, { 'Location': 'http://z.cn/' } );`
* Cookie 支持.


##已解决问题.
* 对 JavaScript 文件进行合理的模块化拆分.
* 使用的 Markdown.js 支持比较差.
* 站点没加载 CSS 和 JavaScript 文件.
* 图片文件没做详细处理. 仅支持 png.
* 需要加载 watch 模块, 让 list 目录存在更新时, 自动更新 `index.markdown` 文件.
* 浏览器可直接访问所有 JavaScript 文件. ( 禁止用户访问所有根目录下文件 )


##bug
* 文件名不能存在空格等特殊符号


##需知

* 站点没使用 *Express* 等框架.
* 使用 **jQuery** 中 Deferred等模块.
    1. Callbacks 模块 - Deferred 模块依赖它.
    2. When 扩展依赖 Deferred 模块 - 实现并行.
    3. queue/dequeue 模块 - 实现串行.


##文档支持
1. [markdown] <http://code.google.com/p/pagedown/wiki/PageDown>

