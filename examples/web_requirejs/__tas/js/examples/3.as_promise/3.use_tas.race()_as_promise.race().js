/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../../../../../__lib/superagent'],
function(tas, superagent){

	var request = superagent;
	var dat;

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

	// When one of tasks in tas.race(..) is completed, continue.
	// The total waiting time here is the longest task time
	// because the other tasks are not canceled.

	// If you want to cancel other tasks that have not yet been completed,
	// see "4.cancel_the_unfinished_tasks.js" for more details.

	tas(function(err, data){
		dat = data;
	});

	return {
		get: function(){
			return dat;
		}
	};
});