



var fs = require( 'fs' );
var path = require( 'path' );
var box = path.resolve( './list' );
var render = require( './render' );

fs.watch( box, function ( event, filename ) {
    render.init();
});



