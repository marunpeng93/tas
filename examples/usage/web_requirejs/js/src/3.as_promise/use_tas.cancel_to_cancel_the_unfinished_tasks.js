/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../superagent'],
function(tas, superagent){

	var request = superagent;
	var dat;

	// 1. Define handlers array.
	var handlers = [];

	// tas.race() is an extension of Tas, we need to load it at the first.
	tas.load('promise-race');

	// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
	// https://github.com/tasjs/tas/blob/master/doc/execution-order/concurrency-order.md
	tas.begin();

	// Perform all tasks at the same time.
	tas.race({
		t1: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';

			// 2. Push the handler to the handlers array.
			handlers.push(request.get(url).end(this.done));
		},

		t2: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/b.json';
			handlers.push(request.get(url).end(this.done));
		},

		t3: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/c.json';
			handlers.push(request.get(url).end(this.done));
		}
	});

	// When one of tasks execution is completed, then continue.
	tas(function(err, data){

		// 3. Cancel other unfinished task(s).
		tas.cancel(handlers);

		// Because we canceled the other unfinished task(s),
		// now the total waiting time is the shortest task time.

		if (err) return tas.abort(err);
		dat = data;
	});

	return {
		get: function(){
			return dat;
		}
	};
});
