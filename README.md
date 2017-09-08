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

　

Tas makes the code structure clear, turning async code to sync, reducing the levels, avoiding callback hell / callback pyramid, is better than Promise, and can be used in [Node.js](https://nodejs.org) and in browsers. 

The tasks written by Tas do not need to use Promise / resolve / reject, generator / yield, async / await, so Tas is easier to use than Promise. Tas is faster than native Promise and co, as faster as bluebird ([Benchmark](https://github.com/hiowenluke/oyo)).

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

Then run the tests in Node.js:
```bash
$ cd /path/to/tas
$ npm test
```

Or run the tests in your browser:
```bash
$ cd /path/to/tas
$ open examples/usage/web/test.html

# or
$ open examples/usage/web_requirejs/test.html
```

　

## Demo

To run these demos, please clone the Tas repo and Install the development dependencies first (if you have not done it yet, see details in section "Test"). Then see the **examples/demo** folder. 

　

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

To run all examples, please clone the Tas repo and Install the development dependencies first (if you have not done it yet, see details in section "Test"). Then see the **examples/usage** folder. All examples and tests are categorized according to Node.js, Web and Web-RequireJS.

　

## API

Tas provides a small amount of APIs to control the flow, and they are simple and easy to use, so you can focus on the code itself without wasting time on mastering Tas. See the **examples/api** folder. All examples and tests are categorized according to Node.js, Web and Web-RequireJS.

　

### Async Tasks

| API            | Functions                                |
| -------------- | ---------------------------------------- |
| return "await" | Used in one of a group of sync tasks.    |
| tas.await()    | If the tasks/subtasks contains async code, use it. |
| tas.next()     | Jump to the next function or tasks to continue. |

　

### As Promise

| API           | Functions                                |
| ------------- | ---------------------------------------- |
| tas.promise() | After this tasks is completed, continue. |
| tas.all()     | After all tasks are completed, continue. |
| tas.race()    | As long as one of tasks is completed, continue. |
| tas.cancel()  | Manually cancel the unfinished task(s).  |
| this.done     | Pass the data received from promise to the next task. |

　

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
| return "abort" | Abort Tas.                               |
| tas.break()    | Break the current tasks from nested function (closures). |
| tas.abort()    | Abort Tas from nested function (closures). |
| tas.done()     | End Tas at the end of the tasks.         |

　

## License

[MIT](LICENSE)

Copyright (c) 2017, Owen Luke

