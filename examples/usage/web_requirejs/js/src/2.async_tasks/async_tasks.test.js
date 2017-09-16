/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './async_tasks'],
function(tas, tester, asyncTasks) {

	tas(function () {

		var test = tester.test;
		var runner = asyncTasks;

		var exp = 8;
		var val = runner.get();

		test("2.async tasks: async tasks", tas, exp, val);
	});
});
