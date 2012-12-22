



var fs = require( 'fs' );



function include( file ) {
    var html = '';
    html = fs.readFileSync( file, 'utf8' );
    return html;
}



module.exports = include;