/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './2.mix_tasks'],
function(tas, tester, mixTasks) {

	tas(function(){

		var test = tester.test;
		var runner = mixTasks;

		var exp = 10;
		var val = runner.get();

		test("2.async tasks: mix tasks", tas, exp, val);
	});
});
