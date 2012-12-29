



var PORT = 8000;
var http = require( 'http' );
var url = require( 'url' );
var path = require( 'path' );
var watch = require( './watch' );
var route = require( './route' );
var render = require( './render' );

// 侦听 /list 目录文件更新
watch.init( './list', function () {
    render.init();
});

var server = http.createServer( function ( request, response) {
    var urlinfo = url.parse( request.url, false, true );
    var pathname = urlinfo.pathname;
    // path.exists 方法判断静态文件是否存在, 是否响应 404 错误.
    // cache 支持. 304.
    // Gzip 支持 - NodeJS 原生支持...?!
    // http://nodejs.org/api/zlib.html
    route.init( pathname, request, response );
});

server.listen( PORT );
console.log( 'Server running at port: ' + PORT + '.' );



