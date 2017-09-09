## The Tasks Execution Order

### In Promise

Think about the following code:

```js
var tester = function(){
    console.log(0);

    new Promise(function (resolve, reject) {
        console.log(1);

        process.nextTick(function () {
            console.log(2);

            resolve();
        });
    }).then(function (data) {
        console.log(3);

    }).then(function (data) {
        console.log(4);
    });
};
```

When the tester() execution is completed, what is the number order in the console?
Yes, obviously, it's 0, 1, 2, 3, 4.

Now, what happens if the tester() is executed twice concurrently?
Unexpectedly, the order is 0, 1, 0, 1, 2, 2, 3, 3, 4, 4, **NOT** 0, 1, 0, 2, 3, 4, 1, 2, 3, 4.
What ever native Promise or promise library such as bluebird and co, they have the same problem. 

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node benchmark/analytics/execution-order/native-promise.js
$ node benchmark/analytics/execution-order/bluebird.js
$ node benchmark/analytics/execution-order/co.js
```

　

### In Tas (Perfect)

In Tas, there is no such problem. Let's rewrite the above code with Tas:

```js
var tester = function(){
    console.log(0);

    tas.promise(function(){
        console.log(1);

        process.nextTick(function(){
            console.log(2);

            tas.resolve();
        });
    });

    tas(function(err, data){
        console.log(3);
    });

    tas(function(){
        console.log(4);
    });
};
```

Now, what happens if the tester() is executed 5 times concurrently?
The order will be 0, **1**, 0, 0, 0, 0, **2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4**, so perfect!

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node benchmark/analytics/execution-order/tas.promise.js
```

　

Wait, what are these **0, 1, 0, 0, 0, 0** going on? Well, let's explain it.

In fact, the concurrent tasks are occurs in sequence, but the duration is very short. We say that the tester() is executed 5 times concurrently, in fact the tester() is executed 5 times consecutively and sequentially.

First time running, tester() is executed, print **0**. Then, tas.promise() is executed synchronously, print **1**. 'Cause tas.promise() is an async task, Tas does not execute any tasks until the async task is done, just adds the remaining tasks to queue and does not execute them, so there is no 2, 3, 4 printed.

Second time running, tester() is executed, print **0**. And, tas.promise() and other tasks will be added to queue directly, so there is no 1, 2, 3, 4 printed, too. And the 3rd, 4th, 5th running, just print **0, 0, 0**.

Now, all tester() executions are completed, the current [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) is done, JavaScript engine will perform the next event, the first async task in tas.promise(), **2** is printed. Then, tas.resolve() returns the results, the tasks in queue is executed one by one, **3, 4** are printed. 

Then, the other tasks which added to queue in 2nd, 3rd, 4th, 5th running is executed one by one. so, we can see the **1, 2, 3, 4** is printed 4 times. Cool!

See [Concurrency Order](https://github.com/tasjs/tas/tree/master/benchmark/analytics/concurrency-order/__readme.md) to learn more.

