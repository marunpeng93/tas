/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './4.cancel_the_unfinished_tasks'],
function(tas, tester, cancelTheUnfinishedTasks) {

	tas(function(){

		var test = tester.test;
		var runner = cancelTheUnfinishedTasks;

		var exp = 'object';
		var val = typeof runner.get();

		test("3.as promise: cancel the unfinished tasks", tas, exp, val);
	});
});
