/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas) {

	var a = 0;

	// tas.forEach() is an extension, we need to load it independently.
	tas.load('forEach');

	tas(function () {
		var arr = [1, 2];
		return [arr];
	});

	// Perform a set of tasks for each array element
	tas.forEach({
		init: function (element) {
			a = element;
		},

		check: function () {
			[1].forEach(function () {
				if (a === 1) {

					// Break tas.forEach(), go to the next task
					tas.breakForEach();
				}
			});
		},

		calc: function () { // ignored
			a++;
		}
	});

	tas(function () {
		a++; // 2
	});

	return {
		get: function () {
			return a; // 2
		}
	};
});
