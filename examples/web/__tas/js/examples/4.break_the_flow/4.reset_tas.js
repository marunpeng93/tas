/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var resetTas = function(){

	var a  = 1;

	var tasks1 = {
		t1: function () {
			tas.abort();
		},

		t2: function () {
			a ++; // skipped
		}
	};

	var tasks2 = {
		t1: function(){
			a ++;
		}
	};

	return {
		get: function(){
			tas(tasks1);
			tas.reset();
			tas(tasks2);
			return a; // 2
		}
	};
}();
