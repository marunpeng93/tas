/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');

var request = require('superagent');
var dat;

// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
// https://github.com/tasjs/tas/blob/master/doc/execution-order/concurrency-order.md
tas.begin();

// Perform all tasks at the same time.
tas.all({
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

// When all tasks execution is completed, then continue.
// The total waiting time is the longest task time.
tas(function(err, data){
	if (err) return tas.abort(err);
	dat = data;
});

module.exports = {
	get: function(){
		return dat;
	}
};
