#process.nextTick 和 setTimeout 区别

* setTimeout 把要执行的函数推迟 s 秒后执行.
* 多个 setTimeout 异步时, 第二个参数(time) 决定执行顺序.
* process.nextTick 当线程空闲时, 直接执行函数.
* process.nextTick 绑定的函数在 setTimeout 绑定的函数之前.
* 多个 process.nextTick 时, 它们之间同步执行.

        console.log( 'a' );
        setTimeout( function () { console.log( 'b' ) }, 10 );
        console.log( 'c' );
        process.nextTick( function () { console.log( 'd' );} );
        console.log( 'e' );
        setTimeout( function () { console.log( 'f' );}, 0 );
        console.log( 'g' );
        process.nextTick( function () { console.log( 'h' ); } );
        // result: a, c, e, g, d, h, f, b

说明:

1. 未做异步处理的先执行, 并且同步. `a, c, e, g`
2. process.nextTick 异步的先执行. `d, h`
3. setTimeout 异步的再执行, 且第二个参数决定执行顺序. `f, b`
