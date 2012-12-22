



var PORT = 8080;
var http = require( 'http' );
var url = require( 'url' );
var path = require( 'path' );
var watch = require( './watch' );
var route = require( './route' );

var server = http.createServer( function ( request, response) {
    var urlinfo = url.parse( request.url, false, true );
    var pathname = urlinfo.pathname;
    // http://www.open-open.com/bbs/view/1321344823593
    // 不能让用户直接访问到 JavaScript 文件.
    // 绑定静态文件服务器目录 - list.
    // path.exists 方法判断静态文件是否存在, 是否响应 404 错误.
    // fs.readFile 如果发生错误, 响应 505 错误.
    // 缺少 mime 类型支持.
    // cache 支持. 304.
    // Gzip 支持 - NodeJS 原生支持...?!
    // http://nodejs.org/api/zlib.html
    // 安全. - 对 pathname 处理.
    // path.normalize..
    console.log( pathname );
    route.init( pathname, request, response );
});

server.listen( PORT );
console.log( 'Server running at port: ' + PORT + '.' );



