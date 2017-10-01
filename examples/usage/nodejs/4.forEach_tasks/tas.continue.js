/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');

var a = 0;
var flag = 0;

tas(function(){
	var arr = [1, 2];
	return [arr];
});

// Perform a set of tasks for each array element
tas.forEach({
	init: function(element){
		a += element;
	},

	check: function(){
		if (flag === 0) {
			flag = 1;

			[1, 2, 3].forEach(function(){

				// Ignore the remaining tasks, and go to init() for next loop.
				tas.continue();
			});
		}
	},

	calc: function(){ // ignored when flag === 0
		a ++;
	}
});

tas(function(){
	a ++; // 5
});

module.exports = {
	get: function(){
		return a; // 5
	}
};
