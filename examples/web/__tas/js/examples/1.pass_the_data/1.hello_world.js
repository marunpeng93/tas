/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var helloWorld = function(){

	var a  = 1;

	// a simple example
	tas("My first tasks", {

		t1: function () {
			a ++; // 2
		},

		t2: function(){
			a ++; // 3
		}
	});

	// Use the simplified way if the task object
	// only contains functions, and no child objects.
	tas("My second tasks",

			function t1(){
				a ++; // 4
			},

			function t2(){
				a ++; // 5
			}
	);

	return {
		get: function(){
			return a; // 5
		}
	};

}();