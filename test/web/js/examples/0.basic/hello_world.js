/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var helloWorld = function(){

	var a = 1;

	tas("hello world", {
		t1: function(){
			a ++; // 2
		},

		t2: function(){
			a ++; //3
		}
	});

	return {
		get: function(){
			return a; // 3
		}
	};

}();