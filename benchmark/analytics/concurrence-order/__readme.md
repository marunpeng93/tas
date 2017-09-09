
## The Concurrency Order

The concurrent tasks are occurs in sequence. Tas runs every time as a task stream, 100 times concurrence with 100 task streams. Consider the following code:

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

If the tester() is executed 5 times, the map of the tasks streams will be like the following:
![](https://raw.githubusercontent.com/tasjs/tas/master/benchmark/analytics/concurrence-order/__res/concurrency-order.png)
