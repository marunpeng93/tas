/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a  = 1;
	var x = 10; // Change the value of x to 0 or 1 to see the different result.

	tas({
		t1: function () {
			tas.abort();
			tas.reset();
		},

		t2: function () {
			a ++; // 2
		}
	});

	tas(function(){
		a ++; // 3
	});

	return {
		get: function(){
			return a; // 3
		}
	};
});