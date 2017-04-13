/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var a = 0;

tas.await(function(){
	a ++; // 1

	setTimeout(function(){
		a ++; // 2

		// After an asynchronous code execution is complete, you must
		// use tas.next() to let Tas continue with subsequent tasks.
		tas.next();

	}, 500);
});

tas(function(){
	a ++; // 3
})

module.exports = {
	get: function(){
		return a;
	}
};
