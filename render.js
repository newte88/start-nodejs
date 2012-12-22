



var fs = require( 'fs' );
var path = require( 'path' );
var util = require( 'util' );
var mx = require( './mx' );
var box =  path.resolve( './list' );
var extname = '.markdown';
var index = 1;

function formatTime( time ) {
    var date = new Date( time );
    var fullYear = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [fullYear, month, day].join( '-' ) + ' ' + [hour, minute, second].join( ':' );
}

function prepareMarkdownFiles() {
    var defer = mx.Deferred();
    var markdownFiles = [];
    fs.readdir( box, function (error, list) {
        if ( error ) {
            defer.resolve( markdownFiles );
            console.log( error );
        }
        markdownFiles = list.filter( function (item, index ) {
            var file = path.join( box, item );
            var status = fs.statSync( file );
            return status.isFile() && path.extname( file ) === extname;
        });
        defer.resolve( markdownFiles );
    });
    return defer;
}

function readFileInfo( file ) {
    var _file = file;
    var defer = mx.Deferred();
    var lastModifyTime = Date.now();
    file = path.resolve( box, file );
    var stats = fs.statSync( file );
    lastModifyTime = stats.mtime || lastModifyTime;
    fs.readFile( file, 'utf8', function ( error, data ) {
        var title = '';
        var link = path.relative( __dirname, path.join( box, path.basename(file, extname) ) );
        if ( error ) {
            console.log( error );
            defer.resolve();
            return;
        }

        var tmp = data.split(/\r\n/);
        for ( var i = 0, l = tmp.length; i < l; i++ ) {
            var item = tmp[i];
            item.replace(/^#([^#]+)/g, function (match, m) {
                title = m;
            });
            if ( title ) {
                break;
            }
        }
        
        if ( !title ) {
            title = 'unknown';
        }

        defer.resolve({
            index: index++,
            title: title,
            link: link,
            time: formatTime( lastModifyTime )
        });
    });
    return defer;
}

function createIndexPage( list ) {
    var text = '';
    var item;
    for ( var i = 0, l = list.length; i < l; i++ ) {
        item = list[i];
        text += item.index + '. [' + item.title + '](' + item.link + ') - ' + item.time + '\r\n';
    }
    var index = path.resolve( './index.txt' );
    var indexMarkdown = path.resolve( './index.markdown' );
    var txt = fs.readFileSync( index, 'utf8' );
    txt = txt.replace( '{{page_list}}', text )
        .replace( '{{current_time}}', formatTime( Date.now() ) );
    fs.writeFileSync( indexMarkdown, txt, 'utf8');
    console.log( 'update' );
}

function init() {
    index = 1;
    mx.when( prepareMarkdownFiles() ).done(function( files ) {
        if ( !files ) {
            return;
        }
        var infos = [];
        files.forEach(function ( file, index ) {
            infos.push( readFileInfo( file ) );
        });
        mx.when.apply( mx, infos ).done(function () {
            createIndexPage.call( null, arguments );
        });
    });
}

if ( !module.parent ) {
    init();
}

exports.init = init;

