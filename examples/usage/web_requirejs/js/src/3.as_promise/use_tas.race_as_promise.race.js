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

	tas.load('promise-race');

	// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
	// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
	tas.begin();

	// Perform all tasks at the same time.
	tas.race({
		t1: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';
			request.get(url).end(this.done);
		},

		t2: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/b.json';
			request.get(url).end(this.done);
		},

		t3: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/c.json';
			request.get(url).end(this.done);
		}
	});

	// When one of tasks execution is completed, then continue.
	// The total waiting time is the longest task time
	// because the other tasks are not canceled.

	// If you want to cancel other tasks that have not yet been completed,
	// see "use_tas.cancel_to_cancel_the_unfinished_tasks.js" for more details.

	tas(function(err, data){
		if (err) return tas.abort(err);
		dat = data;
	});

	return {
		get: function(){
			return dat;
		}
	};
});