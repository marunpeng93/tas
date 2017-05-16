/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './1.ignore_the_current_function'],
function(tas, tester, ignoreTheCurrentFunction) {

	tas(function(){

		var test = tester.test;
		var runner = ignoreTheCurrentFunction;

		var exp = 2;
		var val = runner.get();

		test("4.break the flow: ignore the current function", tas, exp, val);
	});
});
