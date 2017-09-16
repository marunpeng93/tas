/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './use_tas.cancel_to_cancel_the_unfinished_tasks'],
function(tas, tester, useTasCancelToCancelTheUnfinishedTasks) {

	tas(function(){

		var test = tester.test;
		var runner = useTasCancelToCancelTheUnfinishedTasks;

		var exp = 'object';
		var val = typeof runner.get();

		test("3.as promise: use tas.cancel() to cancel the unfinished tasks", tas, exp, val);
	});
});
