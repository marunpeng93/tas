# The Performance of Tas

Tas performs more than **3 million** sync tasks or **1 million** async tasks per second concurrently, faster than native Promise. With Tas, we can write server code with clear code structure and excellent performance in Node.js.

Before running the tests of benchmark, clone the Tas repo first (if you have not done it yet):

```bash
$ git clone https://github.com/tasjs/tas.git
$ cd tas
$ npm install
```

　

### Performance

Run the following:
```bash
$ cd /path/to/tas
$ node benchmark/tas.js
```

The results will be like below:

```bash
Platform info:
macOS Sierra 10.12 x64
Intel(R) Core(TM) i7-4558U CPU @ 2.80GHz x 4
Total Memory 16 GB
Node.js v6.11.2
V8 5.1.281.103
---------------------------------------------
tas                 3577702 times/sec
tas.promise         1202384 times/sec
tas.await           1138029 times/sec
tas.race            798434  times/sec
tas.all             740559  times/sec
tas.forEach         461714  times/sec
```

In fact, the hardware environment is a Macbook Pro (Retina, 13-inch, Late 2013). Obviously, if you are running the above tests on the server, the performance will be more higher. That's why we emphasize "more than".

　

### Tas VS Promise

Run the following:
```bash
$ cd /path/to/tas
$ node benchmark/promise.js
```

The results will be like below:
```bash
Platform info:
macOS Sierra 10.12 x64
Intel(R) Core(TM) i7-4558U CPU @ 2.80GHz x 4
Total Memory 16 GB
Node.js v6.11.2
V8 5.1.281.103
---------------------------------------------
bluebird            1240486    times/sec
co                  78077    times/sec
native-promise      484785    times/sec
tas.promise         1239579    times/sec
```

We can see that tas.promise is faster than native Promise, and as fast as bluebird. The tas.promise is not a promise library, it's an alias of tas.await ([See details](https://github.com/tasjs/tas/blob/master/lib/index.js)), and is better than Promise.

　

### About Validity

Yes, the above tests looks so good. But how can we prove that the results are correct? See  [Execution Order](../execution-order/execution-order.md) and  [Concurrency Order](../execution-order/concurrency-order.md) for more details.

　

### About Benchmark

The above tests are based on [OYO](https://github.com/hiowenluke/oyo), it's a simple and practical benchmark tool.
