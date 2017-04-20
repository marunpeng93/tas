/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './simplify'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 3;
		var val = runner.get();
		tester.test("0.basic: simplify", tas, exp, val);
	});
});
