/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a = 1;

	tas({
		t1: function(){
			[1].forEach(function(){

				// The remaining task(s) in the current tasks will be ignored.
				tas.break();
			});
		},

		t2: function(){ // ignored
			a ++;
		}
	});

	tas(function(){
		a ++; // 2
	});

	return {
		get: function(){
			return a; // 2
		}
	};
});