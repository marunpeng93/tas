/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a  = 1;

	tas({
		name: "tasks1",

		t1: function () {
			a ++; // 2

			// Pass the data to the next function.
			// The next function can be one of the following:
			// 		1. the next function of the current function.
			// 		2. the first function of the next child object.
			// 		3. the first function of the next tasks object (In this case, it's tasks2).

			// Note: must put the data to an array, even if there is only one argument.
			return [1, 2, 3];
		},

		t2: function(b, c, d){
			a += b + c + d; // 8
			return [4, 5, 6];
		},

		// All functions of t2, including sub-object functions will be executed.
		t3: {
			t1: function (b, c, d) {
				a += b + c + d; // 23
				return [7, 8, 9];
			},

			t2: function(b, c, d){
				a += b + c + d; // 47
				return [10, 11, 12];
			}
		}
	});

	tas({
		name: "tasks2",

		t1: function(b, c, d){
			a += b + c + d; // 80
		},

		t2: function(b, c, d){
			a ++; // 81
		},
	});

	return {
		get: function(){
			return a; // 81
		}
	};
});