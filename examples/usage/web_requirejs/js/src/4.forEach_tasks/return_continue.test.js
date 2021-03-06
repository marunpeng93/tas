/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './return_continue'],
function(tas, tester, returnContinue) {

	tas(function () {

		var test = tester.test;
		var runner = returnContinue;

		var exp = 5;
		var val = runner.get();
		test("4.forEach tasks: return continue", tas, exp, val);
	});
});
