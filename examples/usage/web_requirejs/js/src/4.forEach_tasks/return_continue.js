/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas) {

	var a = 0;
	var flag = 0;

	// tas.forEach() is an extension, we need to load it independently.
	tas.load('forEach');

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

				// Ignore the remaining tasks, and go to init() for next loop.
				return "continue";
			}
		},

		calc: function(){
			a ++;
		}
	});

	tas(function(){
		a ++; // 5
	});

	return {
		get: function () {
			return a; // 5
		}
	};

});
