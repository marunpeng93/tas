/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasReset = function() {
	var a = 1;

	tas({
		t1: function () {
			[1].forEach(function () {
				tas.abort();
				tas.reset();
			});
		},

		t2: function () {
			a ++; // 2
		}
	});

	tas(function () {
		a ++; // 3
	});

	return {
		get: function () {
			return a; // 3
		}
	};

}();
