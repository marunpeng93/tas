/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// tas.race() is an extension of Tas, we need to load it at the first.
var tas = require('../tas').load('promise-race');

var request = require('superagent');
var dat;

// 1. Define handlers array.
var handlers = [];

// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
tas.begin();

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

tas(function(err, data){

	// 3. Cancel other unfinished task(s).
	// Therefore, the total waiting time is also the shortest task time.
	tas.cancel(handlers);

	if (err) return tas.abort(err);
	dat = data;
});

module.exports = {
	get: function(){
		return dat;
	}
};
