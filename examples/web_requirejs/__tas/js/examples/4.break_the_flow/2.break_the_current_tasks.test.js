/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './2.break_the_current_tasks'],
function(tas, tester, breakTheCurrentTasks) {

	tas(function(){

		var test = tester.test;
		var runner = breakTheCurrentTasks;

		var exp = 2;
		var val = runner.get();

		test("4.break the flow: break the current tasks", tas, exp, val);
	});
});
