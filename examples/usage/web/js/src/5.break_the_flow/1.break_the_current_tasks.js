/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var breakTheCurrentTasks = function(){

	var a  = 1;

	tas({
		t1: function(){

			// Use return "break" or tas.break() to break the current tasks.
			return 'break'; // tas.break();
		},

		t2: function(){
			a ++; // skipped
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

}();