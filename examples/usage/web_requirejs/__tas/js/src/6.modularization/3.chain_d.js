/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a  = 4;

	tas.await(function(){
		a ++; // 5

		setTimeout(function(){
			a ++; // 6
			tas.next();
		}, 300);
	});

	tas(function(){
		a ++; // 7
	});

	return {
		get: function(){
			return a; // 7
		}
	};
});