/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './the_order_of_tasks'],
function(tas, tester, theOrderOfTasks) {

	tas(function(){

		var test = tester.test;
		var runner = theOrderOfTasks;

		var exp = 9;
		var val = runner.get();

		test("2.async tasks: the order of tasks", tas, exp, val);
	});
});
