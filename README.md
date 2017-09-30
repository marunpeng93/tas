<p align='center'><a href='https://github.com/tasjs/tas' target='_blank'><img width='150' src='https://raw.githubusercontent.com/tasjs/tas/master/res/logo_icon_150.png' /></a><br />
<img height='30' src='https://raw.githubusercontent.com/tasjs/tas/master/res/slogon.png' />
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

　

Tas makes the code structure clear. Tas executes async tasks as sync tasks, avoiding callback hell / callback pyramid, and can be used in [Node.js](https://nodejs.org) and in browsers. "Tas" is the abbreviation of "tasks".

In Tas, we can insert or remove async tasks anywhere in any module without having to adjust the code structure elsewhere, all of them are executed in the order we write, just like the sync tasks, better than Promise,  generator / yield and async / await, and the tasks [execution order](./doc/execution-order/execution-order.md) is more reasonable.

Tas performs more than **3 million** sync tasks or **1 million** async tasks per second concurrently, faster than native Promise ([Benchmark of Performance](./doc/performance/performance.md)). With Tas, we can write server code with clear code structure and excellent performance in Node.js.

　

## Install

In Node.js:
```bash
$ npm install tas --save
```

　

In Web:

Download [tas.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.js) or [tas.min.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.min.js) (only 3KB gzipped).

　

## Test

Clone the Tas repo first:

```bash
$ git clone https://github.com/tasjs/tas.git
$ cd tas
$ npm install
```

Then run the tests in Node.js:
```bash
$ npm test
```

Or run the tests in your browser:
```bash
$ open test/web/index.html
```

　

## Demo

To run these demos, please clone the Tas repo (if you have not done it yet, see details in section "Test"). Then see the **examples/demo** folder. 

　

### Easy Asynchronization

In this demo, there are many asynchronous tasks (represented by setTimeout()) in multiple modules, which are executed in the order we write, just like the synchronization tasks. See below.

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.png)

The results are as follows:

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.gif)

Run this demo in Node.js:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

### Fixing Callback Hell

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/fixing-callback-hell-with-tas.png)

Run these demos in Node.js:

```bash
$ cd /path/to/tas
$ cd examples/demo/fixing-callback-hell
$ node callback-hell.js
$ node fixing-callback-hell.js
```

　

### Better Than Promise

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/better-than-promise.png)

Run these demos in your browser:

```bash
$ cd /path/to/tas
$ cd examples/demo/better-than-promise
$ open promise.html
$ open tas.html
```

　

### Clear Code Structure

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/clear-code-structure.png)

See details: [Express examples by Tas](https://github.com/tasjs/express-examples-by-tas)

　

## Quick Examples

### Sync Tasks

With Tas, we can turn complex logic or high-coupling logic into a set of mini-tasks. All mini-tasks are executed one by one. 

```js
tas({
    t1: function () {
        return 1;
    },
    t2: function(a){
        console.log(a); // 1
        return [2, 3];
    }
});

tas({
    t3: {
        t4: function (a, b) {
            console.log(a, b); // 2 3
            return [[4, 5, 6]];
        }
    },
    t5: {
        t6: function (arr) {
            console.log(arr); // 4 5 6
        }
    }
});
```

　

### Async Tasks

In Tas, we can insert or remove async tasks anywhere in any module without having to adjust the code structure elsewhere, all of them are executed in the order we write, just like the sync tasks.

```js
var a = 0;

tas.await(function(){
    a ++; // 1
  
    setTimeout(function(){      
        a ++; // 2
        tas.next();
    }, 1000);
});

tas(function(){
    a ++ ; // 3
    console.log(a); // 3
})
```

　

### As Promise

We can use tas as Promise. Tas is better than Promise and generator / yield, and the tasks [execution order](./doc/execution-order/execution-order.md) is more reasonable. Tas performs more than **1 million** async tasks per second concurrently, faster than native Promise ([Benchmark of Performance](./doc/performance/performance.md)).

```js
tas.promise(function(){
    process.nextTick(function(){
        tas.resolve(1); // or tas.resolve(null, data)
    });
});

tas(function (data) { // or function(err, data)
   console.log(data);
});
```

　

## Full Examples

See the **examples/usage** folder. All examples (with tests) are categorized according to Node.js, Web and Web-RequireJS.

　

## API

### Sync Tasks

| API           | Functions                   | Usage                                    |
| ------------- | --------------------------- | ---------------------------------------- |
| return <data> | Pass data to the next task. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/1.sync_tasks/return_data.js) |

　

### Async Tasks

| API              | Functions                                | Usage                                    |
| ---------------- | ---------------------------------------- | ---------------------------------------- |
| return "await"   | Hang up Tas, waiting for the async task execution is completed. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/2.async_tasks/async_tasks.js) |
| tas.await()      | Sequential perform a set of async tasks. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/2.async_tasks/async_tasks.js) |
| tas.next(<data>) | When async task is done, pass data to the next task. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/2.async_tasks/pass_data_via_tas.next.js) |

　

### As Promise

| API           | Functions                                | Usage                                    |
| ------------- | ---------------------------------------- | ---------------------------------------- |
| tas.promise() | Equivalent to tas.await().               | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/tas.promise_is_easier_to_use_than_promise.js) |
| tas.resolve() | Equivalent to tas.next().                | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/tas.promise_is_easier_to_use_than_promise.js) |
| tas.all()     | After all async tasks are completed, continue. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/use_tas.all_as_promise.all.js) |
| tas.race()    | As long as one of async tasks is completed, continue. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/use_tas.race_as_promise.race.js) |
| tas.cancel()  | When tas.race() is done, cancel the unfinished async task(s). | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/use_tas.cancel_to_cancel_the_unfinished_tasks.js) |
| this.done     | When tas.all() or tas.race() is done, pass data to the next task. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/use_tas.all_as_promise.all.js) |

　

### ForEach Tasks

| API                   | Functions                                | Usage                                    |
| --------------------- | ---------------------------------------- | ---------------------------------------- |
| tas.forEach()         | Perform a set of tasks for each array element. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/4.forEach_tasks/Perform_a_set_of_tasks_for_each_array_element.js) |
| return "continue"     | Go to the next loop.                     | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/4.forEach_tasks/return_continue.js) |
| tas.continue()        | Go to the next loop (in closures).       | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/4.forEach_tasks/tas.continue.js) |
| return "breakForEach" | Break the tas.forEach() and Go to the next task. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/4.forEach_tasks/return_breakForEach.js) |
| tas.breakForEach()    | Break the tas.forEach() and Go to the next task (in closures). | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/4.forEach_tasks/tas.breakForEach.js) |

　

### Break The Flow

| API            | Functions                                | Usage                                    |
| -------------- | ---------------------------------------- | ---------------------------------------- |
| tas.begin()    | Use it before all tasks if you wanna [abort in Tas](./doc/execution-order/concurrency-order.md). | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/5.break_the_flow/return_abort.js) |
| tas.abort()    | Abort the current [tasks stream](./doc/concurrency-order/concurrency-order.md) from nested function (closures). | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/5.break_the_flow/tas.abort.js) |
| return "abort" | Abort the current [tasks stream](./doc/concurrency-order/concurrency-order.md) in task. | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/5.break_the_flow/return_abort.js) |
| this.abort()   | Abort the current [tasks stream](./doc/concurrency-order/concurrency-order.md) in tas.all() or tas.race(). | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/5.break_the_flow/this.abort.js) |
| return "break" | Break the current tasks.                 | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/5.break_the_flow/return_break.js) |
| tas.break()    | Break the current tasks from nested function (closures). | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/5.break_the_flow/tas.break.js) |

　

## Extensions

In order to pursue faster performance, the following features which not commonly used are not enabled by default and can be enabled by using require('tas').load() or tas.load().

| Name of Extension | How to Load                              | Usage                                    |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| tas.forEach()     | require('tas').load('forEach'), or tas.load('forEach') | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/4.forEach_tasks/Perform_a_set_of_tasks_for_each_array_element.js) |
| tas.all()         | require('tas').load('promise-all'), or tas.load('promise-all') | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/use_tas.all_as_promise.all.js) |
| tas.race()        | require('tas').load('promise-race'), or tas.load('promise-race') | [Usage](https://github.com/tasjs/tas/blob/master/examples/usage/nodejs/3.as_promise/use_tas.race_as_promise.race.js) |
| log tree          | require('tas').load('tree'), or tas.load('tree') | [Usage](./doc/log-tree/log-tree.md)      |

We can load multiple extensions at once, as follows:
```js
var tas = require('tas').load('promise-all', 'promise-race');

// Or like below:
// var tas = require('tas');
// tas.load('promise-all', 'promise-race');
```

　

## Log Tree

Tas can automatically print the names of all tasks as a tree, and the logs in tasks is printed with the indent of tasks,  like the gif presentation in above section "Easy Asynchronization". This makes the execution of the entire project very clear, more intuitive than the function stack in the debugger. [How To Use](./doc/log-tree/log-tree.md)

　

## License

[MIT](LICENSE)

Copyright (c) 2017, Owen Luke

