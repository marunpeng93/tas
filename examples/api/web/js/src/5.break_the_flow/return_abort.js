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
			a ++; // 2
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
		get1: function(){
			tas(tasks1); // abort
			return a; // 2
		},

		get2: function(){
			a = 1;
			tas(tasks2);
			return a; // 3
		}
	};

}();