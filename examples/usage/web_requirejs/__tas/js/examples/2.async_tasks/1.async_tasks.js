/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a  = 0;

	// Use tas.await() if the tasks/subtasks contains async code.
	tas.await(function(){
		a ++; // 1

		setTimeout(function(){
			a ++; // 2

			// After an asynchronous code execution is complete, you must
			// use tas.next() to let Tas continue with subsequent tasks.
			tas.next();

		}, 500);
	});

	// This task is executed only if the previous async task execution is completed.
	tas(function(){
		a ++; // 3
	})

	return {
		get: function(){
			return a; // 3
		}
	};
});