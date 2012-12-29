



;(function () {
    var noop = function () {};
    if ( !window.console ) {
        window.console = {
            log: noop,
            debug: noop,
            warn: noop,
            error: noop,
            dir: noop,
            assert: noop,
            info: noop
        };
    }
})();

console.log( 'init' );



