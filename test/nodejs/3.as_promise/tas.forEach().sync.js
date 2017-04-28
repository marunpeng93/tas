/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var a = 0;

tas(function(){
	var arr = [1, 2];
	return [arr];
});

tas.forEach({
	init: function(element){
		//console.log(element);
	},

	calc: function(){
		a ++; // 2 times.
	}
});

tas(function(){
	a ++; // 3
});

module.exports = {
	get: function(){
		return a; // 3
	}
};
