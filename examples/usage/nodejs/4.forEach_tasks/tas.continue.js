/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// tas.race() is an extension of Tas, we need to load it at the first.
var tas = require('../tas').load('forEach');

var a = 0;
var flag = 0;

tas(function(){
	var arr = [1, 2];
	return [arr];
});

tas.forEach({
	init: function(element){
		a += element;
	},

	check: function(){
		if (flag === 0) {
			flag = 1;

			[1, 2, 3].forEach(function(){
				tas.continue();
			});
		}
	},

	calc: function(){
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
