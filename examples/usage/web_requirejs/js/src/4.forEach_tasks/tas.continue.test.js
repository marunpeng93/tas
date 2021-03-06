/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.continue'],
function(tas, tester, tasContinue) {

	tas(function () {

		var test = tester.test;
		var runner = tasContinue;

		var exp = 5;
		var val = runner.get();
		test("4.forEach tasks: tas.continue()", tas, exp, val);
	});
});
