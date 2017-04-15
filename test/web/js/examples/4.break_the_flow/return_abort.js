/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var returnAbort = function() {
	var a = 1;

	tas({
		t1: function () {
			return 'abort';
		},

		t2: function () {
			a++; // skipped
		}
	});

	tas(function () {
		a++; // skipped
	});

	return {
		get: function () {
			return a; // 1
		}
	};

}();
