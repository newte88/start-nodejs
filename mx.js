



 ;(function () {
    var mx = {};
    mx.type = function (x) {
        return Object.prototype.toString.call(x).toLowerCase().slice(8, -1);
    };

    mx.isFunction = function (x) {
        return mx.type(x) === 'function';
    };

    ;(function () {
        // String to Object flags format cache
        var flagsCache = {};

        // Convert String-formatted flags into Object-formatted ones and store in cache
        function createFlags( flags ) {
            var object = flagsCache[ flags ] = {},
                i, length;
            flags = flags.split( /\s+/ );
            for ( i = 0, length = flags.length; i < length; i++ ) {
                object[ flags[i] ] = true;
            }
            return object;
        }

        var Callbacks = function( flags ) {

            // Convert flags from String-formatted to Object-formatted
            // (we check in cache first)
            flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

            var // Actual callback list
                list = [],
                // Stack of fire calls for repeatable lists
                stack = [],
                // Last fire value (for non-forgettable lists)
                // memory 三种状态.
                // 1, 初始化状态. Callbacks('xxxx'); xxxx 为初始化状态.
                // 2, memory 初始化为 true 时, 需要记录最后一次 context 和 arguments.
                // 3, 在 2 基础上, 如果 stopOnFalse 为 true, 则根据 callback 结果决定 memory 值. 如果 callback 返回 false, 则 memory 为 true;
                memory,
                // Flag to know if list was already fired
                fired,
                // Flag to know if list is currently firing
                firing,
                // First callback to fire (used internally by add and fireWith)
                firingStart,
                // End of the loop when firing
                firingLength,
                // Index of currently firing callback (modified by remove if needed)
                firingIndex,
                // Add one or several callbacks to the list
                add = function( args ) {
                    var i,
                        length,
                        elem,
                        type,
                        actual;
                    for ( i = 0, length = args.length; i < length; i++ ) {
                        elem = args[ i ];
                        type = mx.type( elem );
                        if ( type === "array" ) {
                            // Inspect recursively
                            // 非函数时, 递归下去.
                            add( elem );
                        } else if ( type === "function" ) {
                            // Add if not in unique mode and callback is not in
                            // 非唯一, 添加;
                            // 唯一但不存在, 添加.
                            // 因为使用 ||, 所以能运行到后面, 说明已经是 unique. 那么不存在时, 添加.
                            if ( !flags.unique || !self.has( elem ) ) {
                                list.push( elem );
                            }
                        }
                    }
                },
                // Fire callbacks
                fire = function( context, args ) {
                    // 不存在参数时, 需要手动指定空.
                    args = args || [];
                    // True 时, 记录一次 [ context, args ];
                    memory = !flags.memory || [ context, args ];

                    // 更新状态值.
                    // 初始化数据.
                    fired = true;
                    firing = true;
                    firingIndex = firingStart || 0;
                    firingStart = 0;
                    firingLength = list.length;
                    for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                        // stopOnFalse 决定, 使用 callback 返回值(false), 最终决定是否终止 callback.
                        if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
                            // 标识: 停止运行.
                            memory = true; // Mark as halted
                            break;
                        }
                    }
                    // 更新状态
                    firing = false;

                    // 保证当前可用.
                    if ( list ) {
                        if ( !flags.once ) {
                            // 如果需要执行多次, 并且 stack 里面还有要执行的 [context, arguments]
                            // 那么就执行他们, 同时更新 memory.
                            if ( stack && stack.length ) {
                                memory = stack.shift();
                                self.fireWith( memory[ 0 ], memory[ 1 ] );
                            }
                        } else if ( memory === true ) {
                            // 如果仅执行一次 fired.
                            //
                            self.disable();
                        } else {
                            // 如果仅执行一次.
                            // 并且不需要记录 memory.
                            // 直接清空.
                            list = [];
                        }
                    }
                },
                // Actual Callbacks object
                self = {
                    // Add a callback or a collection of callbacks to the list
                    // 可添加 function. add(fn);
                    // 多个 function. add(fn1, fn2);
                    // 函数数组. add([fn1, fn2]);
                    // 在 add 函数处理时, 会以递归形式添加到 list 中.
                    add: function() {
                        if ( list ) {
                            var length = list.length;
                            add( arguments );
                            // Do we need to add the callbacks to the
                            // current firing batch?
                            // fire 过程中, 也会添加 list ?
                            // callback 的工作就是 添加 list?
                            // 好神奇 - 存在可能性.
                            // 因此需要更新 firingLength 值.
                            if ( firing ) {
                                firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away, unless previous
                            // firing was halted (stopOnFalse)
                            // memory 作用: 后添加的 callback, 继续执行. 除非 stopOnFalse 成立.
                            } else if ( memory && memory !== true ) {
                                firingStart = length;
                                fire( memory[ 0 ], memory[ 1 ] );
                            }
                        }
                        return this;
                    },
                    // Remove a callback from the list
                    remove: function() {
                        if ( list ) {
                            var args = arguments,
                                argIndex = 0,
                                argLength = args.length;
                            for ( ; argIndex < argLength ; argIndex++ ) {
                                for ( var i = 0; i < list.length; i++ ) {
                                    if ( args[ argIndex ] === list[ i ] ) {
                                        // Handle firingIndex and firingLength
                                        // 当正在 firing 过程中时,
                                        // 需要把 firingLength 减 1.
                                        // 如果 firingIndex 比要删除项的索引小时, firingIndex 减 1.
                                        if ( firing ) {
                                            if ( i <= firingLength ) {
                                                firingLength--;
                                                if ( i <= firingIndex ) {
                                                    firingIndex--;
                                                }
                                            }
                                        }
                                        // Remove the element
                                        list.splice( i--, 1 );
                                        // If we have some unicity property then
                                        // we only need to do this once
                                        // 如果 callback 项是唯一的, 删除一次即结束.
                                        if ( flags.unique ) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        return this;
                    },
                    // Control if a given callback is in the list
                    has: function( fn ) {
                        if ( list ) {
                            var i = 0,
                                length = list.length;
                            for ( ; i < length; i++ ) {
                                if ( fn === list[ i ] ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                    // Remove all callbacks from the list
                    empty: function() {
                        list = [];
                        return this;
                    },
                    // Have the list do nothing anymore
                    disable: function() {
                        list = stack = memory = undefined;
                        return this;
                    },
                    // Is it disabled?
                    disabled: function() {
                        return !list;
                    },
                    // Lock the list in its current state
                    lock: function() {
                        stack = undefined;
                        if ( !memory || memory === true ) {
                            self.disable();
                        }
                        return this;
                    },
                    // Is it locked?
                    locked: function() {
                        return !stack;
                    },
                    // Call all callbacks with the given context and arguments
                    fireWith: function( context, args ) {
                        // 保证当前处理 enable 状态.
                        if ( stack ) {
                            if ( firing ) {
                                // 可 fire 多次时, 放到 stack.
                                if ( !flags.once ) {
                                    stack.push( [ context, args ] );
                                }
                            } else if ( !( flags.once && memory ) ) {
                                // flags.once, memory 只要有一个为 false, 即结果为 true.
                                // flags.once: true 时, 使用 memory 决定是否 fire 过.
                                fire( context, args );
                            }
                        }
                        return this;
                    },
                    // Call all the callbacks with the given arguments
                    fire: function() {
                        self.fireWith( this, arguments );
                        return this;
                    },
                    // To know if the callbacks have already been called at least once
                    fired: function() {
                        return !!fired;
                    }
                };

            return self;
        };

        mx.Callbacks = Callbacks;

    })();

    mx.Deferred = function( func ) {
        var doneList = mx.Callbacks( "once memory" ),
            failList = mx.Callbacks( "once memory" ),
            progressList = mx.Callbacks( "memory" ),
            state = "pending",
            lists = {
                resolve: doneList,
                reject: failList,
                notify: progressList
            },
            promise = {
                done: doneList.add,
                fail: failList.add,
                progress: progressList.add,

                state: function() {
                    return state;
                },

                then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
                    deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
                    return this;
                },
                always: function() {
                    deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
                    return this;
                },
                pipe: function( fnDone, fnFail, fnProgress ) {
                    return Deferred(function( newDefer ) {
                        var map = {
                            done: [ fnDone, "resolve" ],
                            fail: [ fnFail, "reject" ],
                            progress: [ fnProgress, "notify" ]
                        }, handler, data;

                        for (handler in map) {
                            data = map[handler];
                            var fn = data[ 0 ],
                                action = data[ 1 ],
                                returned;
                            if ( mx.isFunction( fn ) ) {
                                deferred[ handler ](function() {
                                    returned = fn.apply( this, arguments );
                                    if ( returned && mx.isFunction( returned.promise ) ) {
                                        returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
                                    } else {
                                        newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                                    }
                                });
                            } else {
                                deferred[ handler ]( newDefer[ action ] );
                            }
                        }

                    }).promise();
                },
                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function( obj ) {
                    if ( obj == null ) {
                        obj = promise;
                    } else {
                        for ( var key in promise ) {
                            obj[ key ] = promise[ key ];
                        }
                    }
                    return obj;
                }
            },
            deferred = promise.promise({}),
            key;

        for ( key in lists ) {
            deferred[ key ] = lists[ key ].fire;
            deferred[ key + "With" ] = lists[ key ].fireWith;
        }

        // Handle state
        deferred.done( function() {
            state = "resolved";
        }, failList.disable, progressList.lock ).fail( function() {
            state = "rejected";
        }, doneList.disable, progressList.lock );

        // Call given func if any
        if ( func ) {
            func.call( deferred, deferred );
        }

        // All done!
        return deferred;
    };

    mx.when = function( firstParam ) {
        var sliceDeferred = [].slice;
        var args = sliceDeferred.call( arguments, 0 ),
            i = 0,
            length = args.length,
            pValues = new Array( length ),
            count = length,
            pCount = length,
            deferred = length <= 1 && firstParam && mx.isFunction( firstParam.promise ) ?
                firstParam :
                mx.Deferred(),
            promise = deferred.promise();
        function resolveFunc( i ) {
            return function( value ) {
                args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
                if ( !( --count ) ) {
                    deferred.resolveWith( deferred, args );
                }
            };
        }
        function progressFunc( i ) {
            return function( value ) {
                pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
                deferred.notifyWith( promise, pValues );
            };
        }
        if ( length > 1 ) {
            for ( ; i < length; i++ ) {
                if ( args[ i ] && args[ i ].promise && mx.isFunction( args[ i ].promise ) ) {
                    args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
                } else {
                    --count;
                }
            }
            if ( !count ) {
                deferred.resolveWith( deferred, args );
            }
        } else if ( deferred !== firstParam ) {
            deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
        }
        return promise;
    };

    ;(function () {
        var map = {};
        mx.Queue = {
            queue: function (fx, funcs) {
                var length = arguments.length;
                if (length === 1) {
                    funcs = fx;
                    fx = 'fx';
                }
                if (!map[fx]) {
                    map[fx] = [];
                }
                var callbacks = funcs || [];
                map[fx] = [].concat(map[fx], callbacks);
                return this;
            },
            dequeue: function () {
                if (!fx) {
                    fx = 'fx';
                }
                var callback = map[fx].shift();
                var self = this;
                if (callback) {
                    callback(function () {
                        self.dequeue(fx);
                    });
                }
                return this;
            }
        };
    })();

    ;(function () {
        var topics = {};
        mx.Topic = function( id ) {
            var callbacks,
                method,
                topic = id && topics[ id ];
            if ( !topic ) {
                callbacks = mx.Callbacks();
                topic = {
                    notify: callbacks.fire,
                    bind: callbacks.add,
                    unbind: function () {
                        if (arguments.length === 0) {
                            callback.empty();
                        }
                        else {
                            callbacks.remove.apply(callbacks, arguments);
                        }
                    }
                };
                if ( id ) {
                    topics[ id ] = topic;
                }
            }
            return topic;
        };
    })();

    mx.bind = function (name) {
        var topic = mx.Topic(name);
        topic.bind.apply( topic, Array.prototype.slice.call(arguments, 1) );
    };
    mx.unbind = function (name) {
        var topic = mx.Topic(name);
        topic.unbind.apply( topic, Array.prototype.slice.call(arguments, 1) );
    };
    mx.notify = function (name) {
        var topic = mx.Topic(name);
        topic.notify.apply( topic, Array.prototype.slice.call(arguments, 1) );
    };

    if ( module && module.exports ) {
        module.exports = mx;
    }
    
})();



