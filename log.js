




var fs = require( 'fs' );
var path = require( 'path' );
var dir = './log';

module.exports = function ( string ) {
    var file = Date.now() + '.js';
    var log = path.join( dir, file );
    var argus = [ log ];
    argus.push( string );
    argus.push( 'utf8' );
    argus.push( function () {
        console.log( arguments );
    });
    fs.writeFile.apply( fs, argus ) ;
};



