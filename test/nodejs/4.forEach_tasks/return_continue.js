/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');

var a = 0;
var flag = 0;

tas(function(){
	var arr = [1, 2];
	return [arr];
});

tas.forEach({
	init: function(element){
		//console.log(element);
	},

	check: function(){
		if (flag === 0) {
			flag = 1;
			return "continue";
		}
	},

	calc: function(){
		a ++; // 1 times.
	}
});

tas(function(){
	a ++; // 2
});

module.exports = {
	get: function(){
		return a; // 2
	}
};
