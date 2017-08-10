/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var cancelTheUnfinishedTasks = function(){

	var request = superagent;
	var dat;

	// Perform the following three steps (please notice the serial number):
	// 1. Define handlers array.
	var handlers = [];

	tas.race({
		t1: function(){
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';

			// 2. Push the hander to the handlers array.
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

	tas(function(err, data){

		// 3. Cancel other unfinished task(s).
		tas.cancel(handlers);

		// Therefore, the total waiting time is also the shortest task time.
		dat = data;
	});

	return {
		get: function(){
			return dat;
		}
	};

}();
