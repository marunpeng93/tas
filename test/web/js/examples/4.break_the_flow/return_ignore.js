/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var returnIgnore = function() {
	var a = 1;

	tas(function () {
		return "ignore";
		a++; // skipped
	});

	tas.await(function () {
		return "ignore";
		a++; // skipped
	});

	tas(function () {
		a++; // 2
	});

	return {
		get: function () {
			return a; // 2
		}
	};

}();
