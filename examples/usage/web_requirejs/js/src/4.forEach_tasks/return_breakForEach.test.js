/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './return_breakForEach'],
function(tas, tester, returnBreakForEach) {

	tas(function () {

		var test = tester.test;
		var runner = returnBreakForEach;

		var exp = 2;
		var val = runner.get();
		test("4.forEach tasks: return 'breakForEach'", tas, exp, val);
	});
});
