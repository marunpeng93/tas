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

In Tas, we can insert or remove async tasks anywhere in any module without having to adjust the code structure elsewhere, all of them are executed in the order we write, just like the sync tasks, better than Promise and generator / yield, and the tasks [execution order](https://github.com/tasjs/tas/tree/master/benchmark/analytics/execution-order/__readme.md) is more reasonable.

Tas performs more than **3 million** sync tasks or **1 million** async tasks per second concurrently, faster than native Promise ([Benchmark](https://github.com/tasjs/tas/tree/master/benchmark/__readme.md)). With Tas, we can write server code with clear code structure and excellent performance in Node.js.

　

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

To run these demos, please clone the Tas repo and Install the development dependencies first (if you have not done it yet, see details in section "Test"). Then see the **examples/demo** folder. 

　

### Easy asynchronization

In this demo, there are many asynchronous tasks (represented by setTimeout()) in multiple modules, which are executed in the order we write, just like the synchronization tasks. See below.

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.png)

The results are as follows:

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.gif)

Run this demo in Node.js:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

### Fixing callback hell

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/fixing-callback-hell-with-tas.png)

Run these demos in Node.js:

```bash
$ cd /path/to/tas
$ cd examples/demo/fixing-callback-hell
$ node callback-hell.js
$ node fixing-callback-hell.js
```

　

### Better than Promise

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/better-than-promise.png)

Run these demos in your browser:

```bash
$ cd /path/to/tas
$ cd examples/demo/better-than-promise
$ open promise.html
$ open tas.html
```

　

### Clear code structure

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

// This task is executed after the previous async task execution is completed.
// This proves that all tasks are executed in the order we have written.
tas(function(){
    a ++ ; // 3
    console.log(a); // 3
})
```

　

### As Promise

We can use tas as Promise. Tas is better than Promise and generator / yield, and the tasks [execution order](https://github.com/tasjs/tas/tree/master/benchmark/analytics/execution-order/__readme.md) is more reasonable. Tas performs more than **1 million** async tasks per second concurrently, faster than native Promise ([Benchmark](https://github.com/tasjs/tas/tree/master/benchmark/__readme.md)).

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
});
```

　

## Full Examples

To run all examples, please clone the Tas repo and Install the development dependencies first (if you have not done it yet, see details in section "Test"). Then see the **examples/usage** folder. All examples and tests are categorized according to Node.js, Web and Web-RequireJS.

　

## API

Tas provides a small amount of APIs to control the flow, and they are simple and easy to use, so you can focus on the code itself without wasting time on mastering Tas. See the **examples/api** folder. All examples and tests are categorized according to Node.js, Web and Web-RequireJS.

　

### Sync Tasks

| API           | Functions                   |
| ------------- | --------------------------- |
| return <data> | Pass data to the next task. |

**Note**: Use return [array] instead of return array to pass an array. [See details](https://github.com/tasjs/tas/blob/master/test/mocha/1.sync_tasks/return_data.test.js).

　

### Async Tasks

| API              | Functions                                |
| ---------------- | ---------------------------------------- |
| return "await"   | Used in one of a group of sync tasks.    |
| tas.await()      | If the tasks/subtasks contains async code, use it. |
| tas.next(<data>) | When async code is done, pass data to the next task. |

**Note**: Use tas.next([array]) instead of tas.next(array) to pass an array. [See details](https://github.com/tasjs/tas/blob/master/test/mocha/1.sync_tasks/return_data.test.js).

　

### As Promise

| API           | Functions                                |
| ------------- | ---------------------------------------- |
| tas.promise() | Use it like Promise.                     |
| tas.resolve() | When promise is done, use it to continue. |
| tas.all()     | After all tasks are completed, continue. |
| tas.race()    | As long as one of tasks is completed, continue. |
| tas.cancel()  | When tas.race() is done, cancel the unfinished task(s). |
| this.done     | When tas.all() or tas.race() is done, pass data to the next task. |

　

### ForEach Tasks

| API               | Functions                                |
| ----------------- | ---------------------------------------- |
| tas.forEach()     | Perform a set of tasks for each array element. |
| tas.continue()    | Go to the next loop (in closures).       |
| return "continue" | Go to the next loop.                     |

　

### Break The Flow

| API            | Functions                                |
| -------------- | ---------------------------------------- |
| return "break" | Break the current tasks.                 |
| return "abort" | Abort the current [tasks stream](https://github.com/tasjs/tas/tree/master/benchmark/analytics/concurrency-order/__readme.md). |
| tas.break()    | Break the current tasks from nested function (closures). |
| tas.abort()    | Abort the current [tasks stream](https://github.com/tasjs/tas/tree/master/benchmark/analytics/concurrency-order/__readme.md) from nested function (closures). |

**Note**: Set "begin" flag in first task if you wanna to use abort. [See details](https://github.com/tasjs/tas/tree/master/benchmark/analytics/concurrency-order/__readme.md).
　

## License

[MIT](LICENSE)

Copyright (c) 2017, Owen Luke

