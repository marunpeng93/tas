/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var a  = 1;

// Put the return "ignore" on top of the function to ignore it
tas(function () {
	return "ignore";
	a ++; // skipped
});

tas.await(function () {
	return "ignore";
	a ++; // skipped
});

tas(function(){
	a ++; // 2
});

module.exports = {
	get: function(){
		return a; // 2
	}
};