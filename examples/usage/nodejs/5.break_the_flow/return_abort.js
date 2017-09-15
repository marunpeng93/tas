/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var a = 1;

// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
tas.begin();

tas({
	t1: function () {
		a ++;
	},

	t2: function () {

		// Abort Tas, then the remaining tasks will be ignored.
		return "abort";
	}
});

tas(function(){
	a ++;
});

module.exports = {
	get: function(){
		return a; // 2
	}
};
