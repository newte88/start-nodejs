



var fs = require( 'fs' );

function init( folder, callback ) {
    folder = folder || __dirname;
    callback = callback || function () {};
    fs.watch( folder, function ( event, filename ) {
        callback.apply( null, arguments );
    });
}

exports.init = init;



