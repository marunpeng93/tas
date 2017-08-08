/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var returnAbort = function() {
	var a = 1;

	var tasks1 = {
		t1: function(){
			return "abort";
		},

		t2: function(){
			a ++; // skipped
		}
	};

	var tasks2 = {
		t1: function(){
			a ++;
		},

		t2: function(){
			a ++;
		}
	};

	module.exports = {
		get: function(){
			tas(tasks1); // abort
			return a; // 1
		},

		get1: function(){
			tas(tasks2); // The new tasks is not affected by the previous abort.
			return a; // 3
		}
	};

}();
