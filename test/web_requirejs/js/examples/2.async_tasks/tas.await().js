/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas) {
	var a = 0;

	tas.await(function () {
		a++; // 1

		setTimeout(function () {
			a++; // 2
			tas.next();
		}, 500);
	});

	tas(function () {
		a++; // 3
	});

	return {
		get: function () {
			return a;
		}
	};
});
