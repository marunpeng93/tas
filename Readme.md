# Tas.js

Tas simplifies code logic, making code easy to maintain. Tas executes async code in a sync manner, avoiding callback hell, and is faster and easier to use than Promise. Tas can be used in Node.js and in browsers. Tas is a lightweight JavaScript logic framework (only 3KB gzipped), with no dependency. Tas is the abbreviation of "tasks".

The tasks written by Tas do not need to use Promise / resolve / reject, generator / yield, async / await, so Tas is easier to use than Promise and promise libraries. Tas does not use setTimeout or similar methods recommended by the Promise standard. With no delay, Tas is faster than Promise and promise libraries. (<a href="#why">Why?</a>).

　

## Easy to Use

1. Zero learning costs. Using the basic syntax of JavaScript, you can write the vast majority of tasks.
2. There is no need to write the tasks in the form of a callback, just in logical order.
3. Pass the data via "return" to the next function or tasks naturally.



## Install

### In Node.js

```bash
$ npm install tas
```

Use Tas in modules.

```js
var tas = require("tas");
tas({
    t1: function () {
        // Do something
    },
    t2: function(){
        // Do something
    }
});
```

　

### In Web

Download [Tas.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.js) or [Tas.min.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.min.js) to your local folder such as /path/to/js/lib.

```html
<script src="js/lib/tas.js"></script>
<script>
    tas({
        t1: function () {
            // Do something
        },
        t2: function(){
            // Do something
        }
    });
</script>
```

　

### In Web RequireJS

Download [Tas.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.js) or [Tas.min.js](https://raw.githubusercontent.com/tasjs/tas/master/dist/tas.min.js) to your local folder such as /path/to/js/lib.

```js
define(['tas'], function (tas) {
    tas({
        t1: function () {
            // Do something
        },
        t2: function(){
            // Do something
        }
    });
});
```

　

## Quick Examples

### Sync Tasks

All functions of the tasks object, including sub-object functions are executed one by one, passing the data via "return" to the next function or tasks. (See the full example for [Node.js](https://github.com/tasjs/tas/blob/master/examples/nodejs/1.Basic-flow-control-in-Tas.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/1.Basic-flow-control-in-Tas.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/1.Basic-flow-control-in-Tas.js))

```js
tas("My first tasks", {
    task1: function () {
        // Do something
    },
    task2: function(){
        return [1, 2, 3];
    },
    task3: function(a, b, c){
        console.log(a, b, c); // 1 2 3
        return [4, 5, 6];
    }
});

tas("My Second tasks", {
    tasks1: {
        task1: function (a, b, c) {
            console.log(a, b, c); // 4 5 6
        },
        task2: function(){
            return [7, 8, 9];
        }
    },
    tasks2: {
        task1: function (a, b, c) {
            console.log(a, b, c); // 7 8 9
        },
        task2: function(){
            // Do something
        }
    }
});
```

　

### Async Tasks

Tas executes async code in a sync manner, and all functions that contain async code are executed one by one. As the current async task completes, Tas will continue with subsequent tasks (whether they are async tasks or sync tasks). (See the full example for [Node.js](https://github.com/tasjs/tas/blob/master/examples/nodejs/2.Turns-async-callback-to-sync.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/2.Turns-async-callback-to-sync.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/2.Turns-async-callback-to-sync.js) )

```js
tas.await("Prepare", {
    t1: function(){
        setTimeout(function(){
            tas.next(1, 2, 3);
        }, 1000);
    },
    t2: function(a, b, c){
        console.log(a, b, c); // 1 2 3
        tas.next(4, 5, 6);
    }
});

tas("Ready", function(){
    console.log("Ready");
});

tas.await("Handle the file", {
    init: function (a, b, c) {
        console.log(a, b, c); // 4 5 6
        // Do something
        tas.next();
    },
    readFile: function(){
        // Do something
        tas.next();
    },
    setFileContent: function(){
        // Do something
        tas.next();
    },
    writeFile: function(){
        // Do something
        tas.next();
    }
});

tas("Finished", function(){
    console.log("Finished");
})
```

　

### As Promise

We can use Tas as if using Promise. The tasks written by Tas do not need to use Promise / resolve / reject, generator / yield, async / await, so Tas is easier to use than Promise and promise libraries. 

　
　
#### A Simple Example
　
After this tasks is completed, continue. You can concatenate multiple tasks behind tas.promise(). (See the full example for [Node.js](https://github.com/tasjs/tas/blob/master/examples/nodejs/5.Easier-to-use-than-Promise.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/5.Easier-to-use-than-Promise.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/5.Easier-to-use-than-Promise.js) )

```js
tas.promise(function(){
    // Use this.done() as a callback function and receive data.
    ajax.get('http://a.com/1.json', this.done);
});

// Handle the data.
tas(function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
    // Passing the data to the next function or tasks.
    return [err, data];
});

// Continue to handle the data.
tas({
    t1: function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    },
    t2: function(){
        console.log('Done');
    }
});
```

　
　
#### As Promise.all()
　
Perform mutiple tasks at the same time. After all tasks have been completed, continue. The total waiting time is only that of the longest task time. (See the full example for [Node.js](https://github.com/tasjs/tas/blob/master/examples/nodejs/6.Use-as-Promise.all-\(and-race\).js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/6.Use-as-Promise.all-\(and-race\).js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/6.Use-as-Promise.all-\(and-race\).js) )

For example, get the list data, user data, and advertising data from server at the same time, or load multiple files from local at the same time.

```js
tas.all("Fetch the data", {
    users: function () {
        ajax("http://a.com/users.json", this.done);
    },
    comments: function () {
        ajax("http://a.com/comments.json", this.done);
    },
    posts: function () {
        ajax("http://a.com/posts.json", this.done);
    }
});

tas("Handle the data", function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        data.forEach(function(d){
            console.log(d);
        });
    }
});
```

　
　
#### As Promise.race()
　
When one task is finished, the other unfinished task(s) will be canceled. So the total waiting time is only that of the shortest task time. (See the full example for [Node.js](https://github.com/tasjs/tas/blob/master/examples/nodejs/7.Use-as-cancelable-Promise.race.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/7.Use-as-cancelable-Promise.race.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/7.Use-as-cancelable-Promise.race.js) )

For example, request the same file from multiple mirror websites, or wait for one of the sprites to stop moving, or wait for 5 seconds or wait for the "Next" button to be clicked.

```js
tas.race({
    t1: function () {
        ajax.getData("http://cdn1.a.com/data.json", this.done);
    },
    t2: function () {
        ajax.getData("http://cdn2.a.com/data.json", this.done);
    },
    t3: function () {
        ajax.getData("http://cdn3.a.com/data.json", this.done);
    }
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

　

## Full Examples

Clone the Tas repo:

```bash
$ cd /path/to
$ git clone https://github.com/tasjs/tas.git
```

Run the examples in Node.js:
```bash
$ cd /path/to/tas
$ node examples/nodejs/index.js
```

Or run the examples in your browser:
```bash
$ cd /path/to/tas
$ open examples/web/index.html
$ open examples/web_requirejs/index.html
```

Or view the source code of the examples online:

| Topic                                | For Node.js                              | For Web                                  | For Web RequireJS                        |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 1. Basic flow control in Tas         | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/1.Basic-flow-control-in-Tas.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/1.Basic-flow-control-in-Tas.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/1.Basic-flow-control-in-Tas.js) |
| 2. Turns async callback to sync      | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/2.Turns-async-callback-to-sync.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/2.Turns-async-callback-to-sync.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/2.Turns-async-callback-to-sync.js) |
| 3. Understand the order of Tas tasks | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/3.Understand-the-order-of-Tas-tasks.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/3.Understand-the-order-of-Tas-tasks.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/3.Understand-the-order-of-Tas-tasks.js) |
| 4. Fix callback hell                 | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/4.Fix-callback-hell.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/4.Fix-callback-hell.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/4.Fix-callback-hell.js) |
| 5. Easier to use than Promise        | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/5.Easier-to-use-than-Promise.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/5.Easier-to-use-than-Promise.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/5.Easier-to-use-than-Promise.js) |
| 6. Use as Promise.all (and race)     | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/6.Use-as-Promise.all-\(and-race\).js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/6.Use-as-Promise.all-\(and-race\).js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/6.Use-as-Promise.all-\(and-race\).js) |
| 7. Use as cancelable Promise.race    | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/7.Use-as-cancelable-Promise.race.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/7.Use-as-cancelable-Promise.race.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/7.Use-as-cancelable-Promise.race.js) |
| 8. How powerful Tas is               | [See It](https://github.com/tasjs/tas/blob/master/examples/nodejs/8.How-powerful-Tas-is.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/8.How-powerful-Tas-is.js) | [See It](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/8.How-powerful-Tas-is.js) |

　

## A Crazy Example

Tas can be nested calls, and mix many sync tasks and async tasks. There is **a crazy example** (for [NodeJS](https://github.com/tasjs/tas/blob/master/examples/nodejs/8.How-powerful-Tas-is.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/8.How-powerful-Tas-is.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/8.How-powerful-Tas-is.js) ) to show how powerful Tas is. Please note the order in which the tasks are executed. This helps to deepen understanding of the asynchronous execution mode in JavaScript. 

　

## APIs and Instructions

Tas provides a small amount of APIs and instructions to control the flow, and they are simple and easy to use, so you can focus on the code itself without wasting time on mastering Tas. 

　

### Basic Flow Control

Example for [NodeJS](https://github.com/tasjs/tas/blob/master/examples/nodejs/1.Basic-flow-control-in-Tas.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/1.Basic-flow-control-in-Tas.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/1.Basic-flow-control-in-Tas.js) .

| Usage           | Functions                                |
| --------------- | ---------------------------------------- |
| return "break"  | Abort the current tasks.                 |
| return "break!" | Abort Tas.                               |
| tas.break()     | Abort Tas from nested function (closures). |

　

### Pass The Data

Example for [NodeJS](https://github.com/tasjs/tas/blob/master/examples/nodejs/1.Basic-flow-control-in-Tas.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/1.Basic-flow-control-in-Tas.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/1.Basic-flow-control-in-Tas.js) .

| Usage              | Functions                                |
| ------------------ | ---------------------------------------- |
| return \[1, 2, 3\] | Pass 1, 2, 3 to the next function or tasks. |
| this.foo = "bar"   | The data is valid for the functions in the current task object. |
| tas.foo = "bar"    | The data is valid for the functions in all tasks and modules. |

　

### Handle The Async Tasks

Example for [NodeJS](https://github.com/tasjs/tas/blob/master/examples/nodejs/2.Turns-async-callback-to-sync.js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/2.Turns-async-callback-to-sync.js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/2.Turns-async-callback-to-sync.js) .

| Usage       | Functions                                |
| ----------- | ---------------------------------------- |
| tas.await() | If the tasks/subtasks contains async code, use tas.await(). |
| tas.next()  | Jump to the next function or tasks to continue. |

　

### As Promise

Example for [NodeJS](https://github.com/tasjs/tas/blob/master/examples/nodejs/6.Use-as-Promise.all-\(and-race\).js) | [Web](https://github.com/tasjs/tas/blob/master/examples/web/js/examples/6.Use-as-Promise.all-\(and-race\).js) | [Web RequireJS](https://github.com/tasjs/tas/blob/master/examples/web_requirejs/js/examples/6.Use-as-Promise.all-\(and-race\).js) .

| Usage         | Functions                                |
| ------------- | ---------------------------------------- |
| tas.promise() | After this tasks is completed, continue. |
| tas.all()     | After all tasks are completed, continue. |
| tas.race()    | As long as one of tasks is completed, continue. |
| this.done     | Use as a callback function and receive data. |

　

## <a name="why">Why is Tas faster than Promise?</a>

Tas does not use setTimeout or similar methods recommended by the Promise standard. With no delay, Tas is faster than Promise and promise libraries.

**References:**

\[1\] "This can be implemented with either a 'macro-task' mechanism such as setTimeout or setImmediate, or with a 'micro-task' mechanism such as MutationObserver or process.nextTick." [See details](https://promisesaplus.com/#point-67)

\[2\] "Modern browsers impose a minimum delay of 4ms on every setTimeout, regardless of how long you specify. " [See details](http://www.bluejava.com/4NS/Speed-up-your-Websites-with-a-Faster-setTimeout-using-soon)

\[3\] "setImmediate() is designed to execute a script once the current poll phase completes." [See details](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

\[4\] "All callbacks scheduled via process.nextTick() are run at the end of a phase of the event loop (e.g. timers) before transitioning to the next phase. " [See details](https://nodesource.com/blog/understanding-the-nodejs-event-loop/)

　

## License

[MIT](LICENSE)

Copyright (c) 2017, Owen Luke