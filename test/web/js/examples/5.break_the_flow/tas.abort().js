/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasAbort = function() {
	var a = 1;

	var tasks1 = {
		t1: function(){
			[1].forEach(function(){
				tas.abort();
			});
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

	return {
		get: function(){
			tas(tasks1);
			return a; // 1
		},

		get1: function(){
			tas(tasks2); // skipped, because Tas has aborted.
			return a; // 1
		}
	};

}();
