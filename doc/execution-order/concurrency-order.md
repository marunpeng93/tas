
## The Concurrency Order

In the [execution order](./execution-order.md) section, we know how Tas works, and now let's see how Tas handles concurrent tasks. The concurrent tasks are occurs in sequence. Tas performs all tasks in each concurrency as a **task stream**, and 100 times concurrency correspond to 100 task streams. 

Consider the following code:

```js
var tester = function(done, count){

    tas.promise(function(){
        process.nextTick(function(){
            tas.resolve();
        });
    });

    tas(function(err, data){
        console.log(count);
        done(count);
    });
};
```

If the tester() is executed 3 times, the map of the tasks streams will be like the following:

![](https://raw.githubusercontent.com/tasjs/tas/master/benchmark/analytics/concurrency-order/__res/concurrency-order.png)

The variable count records the serial number of tasks stream. When the current tasks stream execution is completed, done() is called and pass count. The count value must be match the value passed when tester() is called, otherwise it indicates that the current tasks stream failed.

On the other hand, we can think of count as the context of the execution of the tasks stream, which means that Tas saved the environment variables for each concurrent task correctly, and that all tasks get the correct environment variables. 

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node benchmark/analytics/concurrency-order/tas.promise.js
```

　

### Abort in Tas

What happens if we abort in Tas? Well, the remaining tasks in the current tasks stream will not be performed, and the tasks in the next tasks stream will be performs one by one, that's very correct.

Note that if we want to abort in the current task stream, we must use tas.begin() to mark the first task, then Tas will determine which of the tasks in the queue belong to the current tasks stream and ignore them. 

For example:

```js
var test = function(done, count){
    var a = 0;

    // Must use tas.begin() before other tasks if you wanna to abort in Tas.
    // There are three ways to abort in Tas:
    //     return "abort"| see test/mocha/5.break_the_flow/return_abort.test.js
    //     tas.abort()   | see test/mocha/5.break_the_flow/abort_in_tas.await.test.js
    //     this.abort()  | see test/mocha/5.break_the_flow/abort_in_tas.all.test.js
    tas.begin();

    tas({
        t1: function (){
            a ++;

            tas({
                t2: function(){
                    a ++;
                },

                t3: function(){
                    if (count === 1) {
                      
                        // Abort Tas, then the remaining tasks will be ignored.
                        tas.abort();
                    }
                }
            });
        },

        t4: function (){ // ignored when count === 1
            a ++;
        }
    });

    tas(function (){ // ignored when count === 1
        done(count, a);
    });
};
```

Run the following tests one by one to experience it:

```bash
$ cd /path/to/tas
$ cd test
$ mocha mocha/5.break_the_flow/return_abort.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.await.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.promise.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.forEach.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.all.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.race.test.js
```

