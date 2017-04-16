
<p>
<a href='https://travis-ci.org/tasjs/tas' target='_blank'><img src='https://travis-ci.org/tasjs/tas.svg?branch=master' /></a>
<a href='https://codecov.io/gh/tasjs/tas' target='_blank'><img src='https://img.shields.io/codecov/c/github/tasjs/tas/master.svg' /></a>
<a href='https://www.npmjs.com/package/tas' target='_blank'><img src='https://img.shields.io/npm/v/tas.svg' /></a>
<a href='https://www.npmjs.com/package/tas' target='_blank'><img src='https://img.shields.io/npm/l/tas.svg' /></a>
</p>

# Tas.js 

Make code simple and easy to maintain. Tas makes the code structure clear, turning async code to sync, reducing the levels, avoiding callback hell / pyramid, is better than Promise, and can be used in [Node.js](https://nodejs.org) and in browsers. 

The tasks written by Tas do not need to use Promise / resolve / reject, generator / yield, async / await, so Tas is easier to use than Promise. And, also Tas is faster than Promise and promise libraries (<a href="#why">Why</a>).

Tas is a lightweight JavaScript logic framework (only 3KB gzipped), with no dependency. Tas is the abbreviation of "tasks".

　

## Easy to Use

1. Zero learning costs. Using the basic syntax of JavaScript, you can write the vast majority of tasks.
2. There is no need to write the tasks in the form of a callback, just in logical order.
3. Pass the data via return or this to the next function or tasks naturally.


　

## Install

In Node.js:
```bash
$ npm install tas --save
```

　

In Web / RequireJS:

Download [Tas.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.js) or [Tas.min.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.min.js).

　

## Quick Examples

### Sync Tasks

With Tas, we can turn complex logic or high-coupling logic into a set of mini-tasks. All mini-tasks are executed one by one. 

```js
tas("My first tasks", {
    t1: function () {
        return [1, 2, 3];
    },
    t2: function(a, b, c){
        console.log(a, b, c); // 1 2 3
        return [4, 5, 6];
    }
});

tas("My Second tasks", {
    t3: {
        t4: function (a, b, c) {
            console.log(a, b, c); // 4 5 6
            return [7, 8, 9];
        }
    },
    t5: {
        t6: function (a, b, c) {
            console.log(a, b, c); // 7 8 9
        }
    }
});
```

　

### Async Tasks

With Tas, we can write async code like writing sync code, easily avoiding callback hell / pyramid. All async tasks and sync tasks will be executed in the order we have written.

```js
var a = 0;

tas.await(function(){
    a ++; // 1
  
    setTimeout(function(){      
        a ++; // 2
        tas.next();
    }, 1000);
});

// This task is executed after the previous async task execution is completed.
// This proves that all tasks are executed in the order we have written.
tas(function(){
    a ++ ; // 3
    console.log(a); // 3
})
```

　

### As Promise

We can use Tas as if using Promise. The tasks written by Tas do not need to use Promise / resolve / reject, generator / yield, async / await, so Tas is easier to use than Promise and promise libraries. 

```js
tas.promise(function(){
    // Use this.done to pass the data 
    ajax.get('https://api.github.com', this.done);
});

tas(function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
});
```

　

### Modularization

With Tas, when all dependencies (even including async module) execution are completed, the current module will get theire results. Everything becomes sync execution, no callback hell / pyramid. 

a.js (dependency)

```js
var tas = require('tas');
var a = 0;

tas.await(function(){
    a ++; // 1
      
    setTimeout(function(){
        a ++; // 2
        tas.next();
    }, 1000);
});

tas(function(){
    a ++; // 3
});

module.exports = {
    get: function(){
        return a; // 3
    }
};
```

b.js (dependency)

```js
var tas = require('tas');
var a = 2;

tas.await(function(){
	a ++; // 3

	setTimeout(function(){
		a ++; // 4
		tas.next();
	}, 500);
});

tas(function(){
	a ++; // 5
})

module.exports = {
    get: function(){
        return a; // 5
    }
};
```

calc.js (depends on a.js and b.js)
```js
var tas = require('tas');

// The tasks in a.js and b.js are executed in the order we have written.
var ma = require('./a');
var mb = require('./b');

// This task will be executed after all tasks are completed.
tas(function(){
    var a = ma.get(); // 3
    var b = mb.get(); // 5
    console.log(a + b); // 8
});
```

　

## Full Examples

Clone the Tas repo first:

```bash
$ cd /path/to
$ git clone https://github.com/tasjs/tas.git
```

　

### For Node.js

Run the test of examples in Node.js:

```bash
$ cd /path/to/tas/examples
$ node nodejs/__tas/test.js
```

Or view the source code of the examples online:

| Folder            | Topic                               | Example                                  | Test                                     |
| ----------------- | ----------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 1. Pass the data  | 1. Hello world                      | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/1.hello_world.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/1.hello_world.test.js) |
| 1. Pass the data  | 2. Via return                       | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/2.via_return.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/2.via_return.test.js) |
| 1. Pass the data  | 3. Via this                         | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/3.via_this.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/3.via_this.test.js) |
| 1. Pass the data  | 4. Via tas                          | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/4.via_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/1.pass_the_data/4.via_tas.test.js) |
| 2. Async tasks    | 1. Async tasks                      | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/1.async_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/1.async_tasks.test.js) |
| 2. Async tasks    | 2. Mix tasks                        | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/2.mix_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/2.mix_tasks.test.js) |
| 2. Async tasks    | 3. The order of tasks               | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/3.the_order_of_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/3.the_order_of_tasks.test.js) |
| 2. Async tasks    | 4. Fix callback hell (pyramid)      | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/4.fix_callback_hell_\(pyramid\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/2.async_tasks/4.fix_callback_hell_\(pyramid\).test.js) |
| 3. As Promise     | 1. Easier to use than Promise       | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/1.easier_to_use_than_promise.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/1.easier_to_use_than_promise.test.js) |
| 3. As Promise     | 2. Use tas.all() as Promise.all()   | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/2.use_tas.all\(\)_as_promise.all\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/2.use_tas.all\(\)_as_promise.all\(\).test.js) |
| 3. As Promise     | 3. Use tas.race() as Promise.race() | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/3.use_tas.race\(\)_as_promise.race\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/3.use_tas.race\(\)_as_promise.race\(\).test.js) |
| 3. As Promise     | 4. Cancel the unfinished tasks      | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/4.cancel_the_unfinished_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/3.as_promise/4.cancel_the_unfinished_tasks.test.js) |
| 4. Break the flow | 1. Ignore the current function      | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.break_the_flow/1.ignore_the_current_function.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.break_the_flow/1.ignore_the_current_function.test.js) |
| 4. Break the flow | 2. Break the current tasks          | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.break_the_flow/2.break_the_current_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.break_the_flow/2.break_the_current_tasks.test.js) |
| 4. Break the flow | 3. Abort Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.break_the_flow/3.abort_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.break_the_flow/3.abort_tas.test.js) |
| 5. Modularization | 1. Common module                    | [A.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/1.common_a.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/1.common_load.test.js) |
| 5. Modularization | 2. Multiple modules                 | [A.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/2.multiple_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/2.multiple_b.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/2.multiple_load.test.js) |
| 5. Modularization | 3. Dependent chain                  | [A.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/3.chain_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/3.chain_b.js), [C.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/3.chain_c.js), [D.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/3.chain_d.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.modularization/3.chain_load.test.js) |
| 6. Complex        | 1. A crazy example                  | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.complex/1.a_crazy_example.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.complex/1.a_crazy_example.test.js) |

　

### For Web

Run the test of examples in your browser:

```bash
$ cd /path/to/tas/examples
$ open web/__tas/test.html
```

Or view the source code of the examples online:

| Folder            | Topic                               | Example                                  | Test                                     |
| ----------------- | ----------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 1. Pass the data  | 1. Hello world                      | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/1.hello_world.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/1.hello_world.test.js) |
| 1. Pass the data  | 2. Via return                       | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/2.via_return.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/2.via_return.test.js) |
| 1. Pass the data  | 3. Via this                         | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/3.via_this.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/3.via_this.test.js) |
| 1. Pass the data  | 4. Via tas                          | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/4.via_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/1.pass_the_data/4.via_tas.test.js) |
| 2. Async tasks    | 1. Async tasks                      | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/1.async_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/1.async_tasks.test.js) |
| 2. Async tasks    | 2. Mix tasks                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/2.mix_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/2.mix_tasks.test.js) |
| 2. Async tasks    | 3. The order of tasks               | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/3.the_order_of_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/3.the_order_of_tasks.test.js) |
| 2. Async tasks    | 4. Fix callback hell (pyramid)      | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/4.fix_callback_hell_\(pyramid\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/2.async_tasks/4.fix_callback_hell_\(pyramid\).test.js) |
| 3. As Promise     | 1. Easier to use than Promise       | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/1.easier_to_use_than_promise.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/1.easier_to_use_than_promise.test.js) |
| 3. As Promise     | 2. Use tas.all() as Promise.all()   | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/2.use_tas.all\(\)_as_promise.all\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/2.use_tas.all\(\)_as_promise.all\(\).test.js) |
| 3. As Promise     | 3. Use tas.race() as Promise.race() | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/3.use_tas.race\(\)_as_promise.race\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/3.use_tas.race\(\)_as_promise.race\(\).test.js) |
| 3. As Promise     | 4. Cancel the unfinished tasks      | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/4.cancel_the_unfinished_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/3.as_promise/4.cancel_the_unfinished_tasks.test.js) |
| 4. Break the flow | 1. Ignore the current function      | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.break_the_flow/1.ignore_the_current_function.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.break_the_flow/1.ignore_the_current_function.test.js) |
| 4. Break the flow | 2. Break the current tasks          | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.break_the_flow/2.break_the_current_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.break_the_flow/2.break_the_current_tasks.test.js) |
| 4. Break the flow | 3. Abort Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.break_the_flow/3.abort_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.break_the_flow/3.abort_tas.test.js) |
| 5. Modularization | 1. Common module                    | [A.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/1.common_a.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/1.common_load.test.js) |
| 5. Modularization | 2. Multiple modules                 | [A.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/2.multiple_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/2.multiple_b.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/2.multiple_load.test.js) |
| 5. Modularization | 3. Dependent chain                  | [A.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/3.chain_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/3.chain_b.js), [C.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/3.chain_c.js), [D.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/3.chain_d.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.modularization/3.chain_load.test.js) |
| 6. Complex        | 1. A crazy example                  | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.complex/1.a_crazy_example.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.complex/1.a_crazy_example.test.js) |

　

### For Web RequireJS

Run the test of examples in your browser:

```bash
$ cd /path/to/tas/examples
$ open web_requirejs/__tas/test.html
```

Or view the source code of the examples online:

| Folder            | Topic                               | Example                                  | Test                                     |
| ----------------- | ----------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 1. Pass the data  | 1. Hello world                      | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/1.hello_world.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/1.hello_world.test.js) |
| 1. Pass the data  | 2. Via return                       | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/2.via_return.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/2.via_return.test.js) |
| 1. Pass the data  | 3. Via this                         | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/3.via_this.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/3.via_this.test.js) |
| 1. Pass the data  | 4. Via tas                          | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/4.via_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/1.pass_the_data/4.via_tas.test.js) |
| 2. Async tasks    | 1. Async tasks                      | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/1.async_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/1.async_tasks.test.js) |
| 2. Async tasks    | 2. Mix tasks                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/2.mix_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/2.mix_tasks.test.js) |
| 2. Async tasks    | 3. The order of tasks               | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/3.the_order_of_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/3.the_order_of_tasks.test.js) |
| 2. Async tasks    | 4. Fix callback hell (pyramid)      | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/4.fix_callback_hell_\(pyramid\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/2.async_tasks/4.fix_callback_hell_\(pyramid\).test.js) |
| 3. As Promise     | 1. Easier to use than Promise       | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/1.easier_to_use_than_promise.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/1.easier_to_use_than_promise.test.js) |
| 3. As Promise     | 2. Use tas.all() as Promise.all()   | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/2.use_tas.all\(\)_as_promise.all\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/2.use_tas.all\(\)_as_promise.all\(\).test.js) |
| 3. As Promise     | 3. Use tas.race() as Promise.race() | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/3.use_tas.race\(\)_as_promise.race\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/3.use_tas.race\(\)_as_promise.race\(\).test.js) |
| 3. As Promise     | 4. Cancel the unfinished tasks      | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/4.cancel_the_unfinished_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/3.as_promise/4.cancel_the_unfinished_tasks.test.js) |
| 4. Break the flow | 1. Ignore the current function      | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.break_the_flow/1.ignore_the_current_function.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.break_the_flow/1.ignore_the_current_function.test.js) |
| 4. Break the flow | 2. Break the current tasks          | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.break_the_flow/2.break_the_current_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.break_the_flow/2.break_the_current_tasks.test.js) |
| 4. Break the flow | 3. Abort Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.break_the_flow/3.abort_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.break_the_flow/3.abort_tas.test.js) |
| 5. Modularization | 1. Common module                    | [A.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/1.common_a.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/1.common_load.test.js) |
| 5. Modularization | 2. Multiple modules                 | [A.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/2.multiple_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/2.multiple_b.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/2.multiple_load.test.js) |
| 5. Modularization | 3. Dependent chain                  | [A.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/3.chain_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/3.chain_b.js), [C.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/3.chain_c.js), [D.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/3.chain_d.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.modularization/3.chain_load.test.js) |
| 6. Complex        | 1. A crazy example                  | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.complex/1.a_crazy_example.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.complex/1.a_crazy_example.test.js) |

　

## APIs Examples

Tas provides a small amount of APIs to control the flow, and they are simple and easy to use, so you can focus on the code itself without wasting time on mastering Tas. 

　

### For Node.js 

Pass The Data

| API                | Functions                                | Example                                  | Test                                     |
| ------------------ | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return \[1, 2, 3\] | Pass 1, 2, 3 to the next function or tasks. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/1.pass_the_data/via_return.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/1.pass_the_data/via_return.test.js) |
| this.foo = "bar"   | The data is valid for the functions in the current task object. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/1.pass_the_data/via_this.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/1.pass_the_data/via_this.test.js) |
| tas.foo = "bar"    | The data is valid for the functions in all tasks and modules. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/1.pass_the_data/via_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/1.pass_the_data/via_tas.test.js) |

　

Async Tasks

| API            | Functions                                | Example                                  | Test                                     |
| -------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "await" | Used in one of a group of sync tasks.    | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/2.async_tasks/return_await.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/2.async_tasks/return_await.test.js) |
| tas.await()    | If the tasks/subtasks contains async code, use it. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/2.async_tasks/tas.await\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/2.async_tasks/tas.await\(\).test.js) |
| tas.next()     | Jump to the next function or tasks to continue. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/2.async_tasks/tas.next\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/2.async_tasks/tas.next\(\).test.js) |

　

As Promise

| API           | Functions                                | Example                                  | Test                                     |
| ------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.promise() | After this tasks is completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.promsise\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.promsise\(\).test.js) |
| tas.all()     | After all tasks are completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.all\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.all\(\).test.js) |
| tas.race()    | As long as one of tasks is completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.race\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.race\(\).test.js) |
| tas.cancel()  | Manually cancel the unfinished task(s).  | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.cancel\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/tas.cancel\(\).test.js) |
| this.done     | Pass the data received from promise to the next task. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/this.done.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/3.as_promise/this.done.test.js) |

　

Break The Flow

| API             | Functions                                | Example                                  | Test                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "ignore" | Ignore the current function.             | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/return_ignore.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/return_ignore.test.js) |
| return "break"  | Break the current tasks.                 | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/return_break.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/return_break.test.js) |
| return "abort"  | Abort Tas.                               | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/return_abort.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/return_abort.test.js) |
| tas.break()     | Break the current tasks from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/tas.break\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/tas.break\(\).test.js) |
| tas.abort()     | Abort Tas from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/tas.abort\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.break_the_flow/tas.abort\(\).test.js) |

　

### For Web

Pass The Data

| API                | Functions                                | Example                                  | Test                                     |
| ------------------ | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return \[1, 2, 3\] | Pass 1, 2, 3 to the next function or tasks. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/1.pass_the_data/via_return.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/1.pass_the_data/via_return.test.js) |
| this.foo = "bar"   | The data is valid for the functions in the current task object. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/1.pass_the_data/via_this.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/1.pass_the_data/via_this.test.js) |
| tas.foo = "bar"    | The data is valid for the functions in all tasks and modules. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/1.pass_the_data/via_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/1.pass_the_data/via_tas.test.js) |

　

Async Tasks

| API            | Functions                                | Example                                  | Test                                     |
| -------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "await" | Used in one of a group of sync tasks.    | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/2.async_tasks/return_await.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/2.async_tasks/return_await.test.js) |
| tas.await()    | If the tasks/subtasks contains async code, use it. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/2.async_tasks/tas.await\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/2.async_tasks/tas.await\(\).test.js) |
| tas.next()     | Jump to the next function or tasks to continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/2.async_tasks/tas.next\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/2.async_tasks/tas.next\(\).test.js) |

　

As Promise

| API           | Functions                                | Example                                  | Test                                     |
| ------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.promise() | After this tasks is completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.promsise\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.promsise\(\).test.js) |
| tas.all()     | After all tasks are completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.all\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.all\(\).test.js) |
| tas.race()    | As long as one of tasks is completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.race\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.race\(\).test.js) |
| tas.cancel()  | Manually cancel the unfinished task(s).  | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.cancel\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/tas.cancel\(\).test.js) |
| this.done     | Pass the data received from promise to the next task. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/this.done.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/3.as_promise/this.done.test.js) |

　

Break The Flow

| API             | Functions                                | Example                                  | Test                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "ignore" | Ignore the current function.             | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/return_ignore.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/return_ignore.test.js) |
| return "break"  | Break the current tasks.                 | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/return_break.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/return_break.test.js) |
| return "abort"  | Abort Tas.                               | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/return_abort.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/return_abort.test.js) |
| tas.break()     | Break the current tasks from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/tas.break\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/tas.break\(\).test.js) |
| tas.abort()     | Abort Tas from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/tas.abort\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.break_the_flow/tas.abort\(\).test.js) |

　

### For Web RequireJS 

Pass The Data

| API                | Functions                                | Example                                  | Test                                     |
| ------------------ | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return \[1, 2, 3\] | Pass 1, 2, 3 to the next function or tasks. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/1.pass_the_data/via_return.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/1.pass_the_data/via_return.test.js) |
| this.foo = "bar"   | The data is valid for the functions in the current task object. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/1.pass_the_data/via_this.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/1.pass_the_data/via_this.test.js) |
| tas.foo = "bar"    | The data is valid for the functions in all tasks and modules. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/1.pass_the_data/via_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/1.pass_the_data/via_tas.test.js) |

　

Async Tasks

| API            | Functions                                | Example                                  | Test                                     |
| -------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "await" | Used in one of a group of sync tasks.    | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/2.async_tasks/return_await.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/2.async_tasks/return_await.test.js) |
| tas.await()    | If the tasks/subtasks contains async code, use it. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/2.async_tasks/tas.await\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/2.async_tasks/tas.await\(\).test.js) |
| tas.next()     | Jump to the next function or tasks to continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/2.async_tasks/tas.next\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/2.async_tasks/tas.next\(\).test.js) |

　

As Promise

| API           | Functions                                | Example                                  | Test                                     |
| ------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.promise() | After this tasks is completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.promsise\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.promsise\(\).test.js) |
| tas.all()     | After all tasks are completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.all\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.all\(\).test.js) |
| tas.race()    | As long as one of tasks is completed, continue. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.race\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.race\(\).test.js) |
| tas.cancel()  | Manually cancel the unfinished task(s).  | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.cancel\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/tas.cancel\(\).test.js) |
| this.done     | Pass the data received from promise to the next task. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/this.done.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/3.as_promise/this.done.test.js) |

　

Break The Flow

| API             | Functions                                | Example                                  | Test                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "ignore" | Ignore the current function.             | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/return_ignore.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/return_ignore.test.js) |
| return "break"  | Break the current tasks.                 | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/return_break.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/return_break.test.js) |
| return "abort"  | Abort Tas.                               | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/return_abort.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/return_abort.test.js) |
| tas.break()     | Break the current tasks from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/tas.break\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/tas.break\(\).test.js) |
| tas.abort()     | Abort Tas from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/tas.abort\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.break_the_flow/tas.abort\(\).test.js) |

　

## <a name='test'>Test</a>

Clone the Tas repo (if you have not done so yet):

```bash
$ cd /path/to
$ git clone https://github.com/tasjs/tas.git
```

　

#### With Mocha

```bash
$ cd /path/to/tas
$ npm test
```

　

#### In Node.JS

Test with Node.js
```bash
$ cd /path/to/tas/test
$ node nodejs/test.js
```

　

#### In Web

Test in your browser:
```bash
$ cd /path/to/tas/test
$ open web/test.html
```

　

#### In Web RequireJS

Test in your browser:
```bash
$ cd /path/to/tas/test
$ open web_requirejs/test.html
```

　

## <a name="why">Why is Tas faster than Promise?</a>

Tas does not use setTimeout or similar methods recommended by the Promise standard. With no delay, Tas is faster than Promise and promise libraries such as bluebird, Q, aigle, when.js, etc.

**References:**

\[1\] "This can be implemented with either a 'macro-task' mechanism such as setTimeout or setImmediate, or with a 'micro-task' mechanism such as MutationObserver or process.nextTick." [See details](https://promisesaplus.com/#point-67)

\[2\] "Modern browsers impose a minimum delay of 4ms on every setTimeout, regardless of how long you specify. " [See details](http://www.bluejava.com/4NS/Speed-up-your-Websites-with-a-Faster-setTimeout-using-soon)

\[3\] "setImmediate() is designed to execute a script once the current poll phase completes." [See details](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

\[4\] "All callbacks scheduled via process.nextTick() are run at the end of a phase of the event loop (e.g. timers) before transitioning to the next phase. " [See details](https://nodesource.com/blog/understanding-the-nodejs-event-loop/)

　

## License

[MIT](LICENSE)

Copyright (c) 2017, Owen Luke
