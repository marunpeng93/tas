<p align='center'><a href='https://github.com/tasjs/tas' target='_blank'><img width='150' src='https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/logo/logo_icon_150.png' /></a><br />
<img height='30' src='https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/logo/slogon.png' />
</p>

<p align='center'>
<a href='https://travis-ci.org/tasjs/tas' target='_blank'><img src='https://img.shields.io/travis/tasjs/tas/master.svg?label=linux' alt='Linux Build Status' /></a>
<a href='https://ci.appveyor.com/project/tasjs/tas' target='_blank'><img src='https://img.shields.io/appveyor/ci/tasjs/tas/master.svg?label=windows' alt='Windows Build Status' /></a>
<a href='https://codecov.io/gh/tasjs/tas' target='_blank'><img src='https://img.shields.io/codecov/c/github/tasjs/tas/master.svg' alt='Coverage Status' /></a>
<a href='https://npmjs.org/package/tas' target='_blank'><img src='https://img.shields.io/npm/v/tas.svg' alt='Version' /></a>
<a href='https://npmjs.org/package/tas' target='_blank'><img src='https://img.shields.io/npm/l/tas.svg' alt='License' /></a>
<br />
<a href='https://saucelabs.com/beta/builds/c14fda5c87d642e3a908616eaa38856d' target='_blank'><img src='https://saucelabs.com/browser-matrix/tasjs.svg' alt='Sauce Test Status' /></a>
</p>

　

Tas makes the code structure clear, turning async code to sync, reducing the levels, avoiding callback hell / callback pyramid, is better than Promise, and can be used in [Node.js](https://nodejs.org) and in browsers. 

The tasks written by Tas do not need to use Promise / resolve / reject, generator / yield, async / await, so Tas is easier to use than Promise. And, also Tas is faster than Promise and promise libraries (<a href="#why">Why</a>).

Tas is a lightweight JavaScript logic framework (only 3KB gzipped), with no dependency. Tas is the abbreviation of "tasks".

　

## Install

In Node.js:
```bash
$ npm install tas --save
```

　

In Web / RequireJS:

Download [tas.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.js) or [tas.min.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.min.js).

　

## Test

Clone the Tas repo first:

```bash
$ cd /path/to
$ git clone https://github.com/tasjs/tas.git
```

Install the development dependencies:
```bash
$ cd /path/to/tas
$ npm install
```

Then run tests in Node.js:
```bash
$ cd /path/to/tas
$ npm test
```

Or run tests in your browser:
```bash
$ cd /path/to/tas
$ open test/web/test.html
```

　

## Demo

To run these demos, please clone the Tas repo and Install the development dependencies first (if you have not done it yet). See details in section "Test".

　

### 1. Fixing callback hell

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/demo/fixing-callback-hell-with-tas.png)

Run these demos in Node.js:

```bash
$ cd /path/to/tas/examples/general/fixing-callback-hell
$ node callback-hell.js
$ node fixing-callback-hell.js
```

　

### 2. Better than Promise

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/demo/better-than-promise.png)

Run these demos in your browser:

```bash
$ cd /path/to/tas/examples/general/better-than-promise
$ open promise.html
$ open tas.html
```

　

### 3. Clear code structure

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/demo/clear-code-structure.png)

See details: [Express examples by Tas](https://github.com/tasjs/express-examples-by-tas)

　

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

With Tas, we can write async code like writing sync code, easily avoiding callback hell / callback pyramid. All async tasks and sync tasks will be executed in the order we have written.

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

    // At the end of the tasks, use tas.done() to end Tas 
    // because Tas does not know when the async task is stopped.
    tas.done();
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

tas(function(){
    // At the end of the tasks, use tas.done() to end Tas 
    // because Tas does not know when the async task is stopped.
    tas.done();
});
```

　

### Modularization

With Tas, when all dependencies (even including async module) execution are completed, the current module will get theire results. Everything becomes sync execution, no callback hell / callback pyramid. 

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
    
    // At the end of the tasks, use tas.done() to end Tas 
    // because Tas does not know when the async task is stopped.
    tas.done();
});
```

　

## Full Examples

Clone the Tas repo (if you have not done so yet):

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
| 4. ForEach tasks  | 1. Use tas.forEach()                | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.test.js) |
| 5. Break the flow | 1. Ignore the current function      | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/1.ignore_the_current_function.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/1.ignore_the_current_function.test.js) |
| 5. Break the flow | 2. Break the current tasks          | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/2.break_the_current_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/2.break_the_current_tasks.test.js) |
| 5. Break the flow | 3. Abort Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/3.abort_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/3.abort_tas.test.js) |
| 5. Break the flow | 4. Reset Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/4.reset_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/5.break_the_flow/4.reset_tas.test.js) |
| 6. Modularization | 1. Common module                    | [A.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/1.common_a.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/1.common_load.test.js) |
| 6. Modularization | 2. Multiple modules                 | [A.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/2.multiple_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/2.multiple_b.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/2.multiple_load.test.js) |
| 6. Modularization | 3. Dependent chain                  | [A.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/3.chain_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/3.chain_b.js), [C.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/3.chain_c.js), [D.js](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/3.chain_d.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/6.modularization/3.chain_load.test.js) |
| 7. Complex        | 1. A crazy example                  | [Example](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/7.complex/1.a_crazy_example.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/nodejs/__tas/7.complex/1.a_crazy_example.test.js) |

　

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
| 4. ForEach tasks  | 1. Use tas.forEach()                | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.test.js) |
| 5. Break the flow | 1. Ignore the current function      | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/1.ignore_the_current_function.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/1.ignore_the_current_function.test.js) |
| 5. Break the flow | 2. Break the current tasks          | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/2.break_the_current_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/2.break_the_current_tasks.test.js) |
| 5. Break the flow | 3. Abort Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/3.abort_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/3.abort_tas.test.js) |
| 5. Break the flow | 4. Reset Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/4.reset_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/5.break_the_flow/4.reset_tas.test.js) |
| 6. Modularization | 1. Common module                    | [A.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/1.common_a.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/1.common_load.test.js) |
| 6. Modularization | 2. Multiple modules                 | [A.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/2.multiple_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/2.multiple_b.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/2.multiple_load.test.js) |
| 6. Modularization | 3. Dependent chain                  | [A.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/3.chain_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/3.chain_b.js), [C.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/3.chain_c.js), [D.js](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/3.chain_d.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/6.modularization/3.chain_load.test.js) |
| 7. Complex        | 1. A crazy example                  | [Example](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/7.complex/1.a_crazy_example.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web/__tas/js/examples/7.complex/1.a_crazy_example.test.js) |

　

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
| 4. ForEach tasks  | 1. Use tas.forEach()                | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.test.js) |
| 5. Break the flow | 1. Ignore the current function      | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/1.ignore_the_current_function.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/1.ignore_the_current_function.test.js) |
| 5. Break the flow | 2. Break the current tasks          | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/2.break_the_current_tasks.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/2.break_the_current_tasks.test.js) |
| 5. Break the flow | 3. Abort Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/3.abort_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/3.abort_tas.test.js) |
| 5. Break the flow | 4. Reset Tas                        | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/4.reset_tas.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/5.break_the_flow/4.reset_tas.test.js) |
| 6. Modularization | 1. Common module                    | [A.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/1.common_a.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/1.common_load.test.js) |
| 6. Modularization | 2. Multiple modules                 | [A.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/2.multiple_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/2.multiple_b.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/2.multiple_load.test.js) |
| 6. Modularization | 3. Dependent chain                  | [A.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/3.chain_a.js), [B.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/3.chain_b.js), [C.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/3.chain_c.js), [D.js](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/3.chain_d.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/6.modularization/3.chain_load.test.js) |
| 7. Complex        | 1. A crazy example                  | [Example](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/7.complex/1.a_crazy_example.js) | [Test](https://github.com/tasjs/tas/tree/master/examples/web_requirejs/__tas/js/examples/7.complex/1.a_crazy_example.test.js) |

　

## API Examples

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

　

ForEach Tasks

| API               | Functions                                | Example                                  | Test                                     |
| ----------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.forEach()     | Perform a set of tasks for each array element. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.forEach_tasks/tas.forEach\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.forEach_tasks/tas.forEach\(\).test.js) |
| tas.continue()    | Go to the next loop (in closures).       | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.forEach_tasks/tas.continue\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.forEach_tasks/tas.continue\(\).test.js) |
| return "continue" | Go to the next loop.                     | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/4.forEach_tasks/return_continue.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/4.forEach_tasks/return_continue.test.js) |

　

Break The Flow

| API             | Functions                                | Example                                  | Test                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "ignore" | Ignore the current function.             | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/return_ignore.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/return_ignore.test.js) |
| return "break"  | Break the current tasks.                 | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/return_break.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/return_break.test.js) |
| return "abort"  | Abort Tas.                               | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/return_abort.js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/return_abort.test.js) |
| tas.break()     | Break the current tasks from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/tas.break\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/tas.break\(\).test.js) |
| tas.abort()     | Abort Tas from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/tas.abort\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/tas.abort\(\).test.js) |
| tas.reset()     | Reset the status of Tas for running again. | [Example](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/tas.reset\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/nodejs/5.break_the_flow/tas.reset\(\).test.js) |
| tas.done()      | End Tas at the end of the tasks.         |                                          |                                          |

　

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

　

ForEach Tasks

| API               | Functions                                | Example                                  | Test                                     |
| ----------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.forEach()     | Perform a set of tasks for each array element. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.forEach_tasks/tas.forEach\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.forEach_tasks/tas.forEach\(\).test.js) |
| tas.continue()    | Go to the next loop (in closures).       | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.forEach_tasks/tas.continue\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.forEach_tasks/tas.continue\(\).test.js) |
| return "continue" | Go to the next loop.                     | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.forEach_tasks/return_continue.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/4.forEach_tasks/return_continue.test.js) |

　

Break The Flow

| API             | Functions                                | Example                                  | Test                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "ignore" | Ignore the current function.             | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/return_ignore.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/return_ignore.test.js) |
| return "break"  | Break the current tasks.                 | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/return_break.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/return_break.test.js) |
| return "abort"  | Abort Tas.                               | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/return_abort.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/return_abort.test.js) |
| tas.break()     | Break the current tasks from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/tas.break\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/tas.break\(\).test.js) |
| tas.abort()     | Abort Tas from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/tas.abort\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/tas.abort\(\).test.js) |
| tas.reset()     | Reset the status of Tas for running again. | [Example](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/tas.reset\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web/js/examples/5.break_the_flow/tas.reset\(\).test.js) |
| tas.done()      | End Tas at the end of the tasks.         |                                          |                                          |

　

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

　

ForEach Tasks

| API               | Functions                                | Example                                  | Test                                     |
| ----------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.forEach()     | Perform a set of tasks for each array element. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.forEach_tasks/tas.forEach\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.forEach_tasks/tas.forEach\(\).test.js) |
| tas.continue()    | Go to the next loop (in closures).       | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.forEach_tasks/tas.continue\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.forEach_tasks/tas.continue\(\).test.js) |
| return "continue" | Go to the next loop.                     | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.forEach_tasks/return_continue.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/4.forEach_tasks/return_continue.test.js) |

　

Break The Flow

| API             | Functions                                | Example                                  | Test                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| return "ignore" | Ignore the current function.             | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/return_ignore.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/return_ignore.test.js) |
| return "break"  | Break the current tasks.                 | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/return_break.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/return_break.test.js) |
| return "abort"  | Abort Tas.                               | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/return_abort.js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/return_abort.test.js) |
| tas.break()     | Break the current tasks from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/tas.break\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/tas.break\(\).test.js) |
| tas.abort()     | Abort Tas from nested function (closures). | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/tas.abort\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/tas.abort\(\).test.js) |
| tas.reset()     | Reset the status of Tas for running again. | [Example](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/tas.reset\(\).js) | [Test](https://github.com/tasjs/tas/tree/master/test/web_requirejs/js/examples/5.break_the_flow/tas.reset\(\).test.js) |
| tas.done()      | End Tas at the end of the tasks.         |                                          |                                          |

　

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

