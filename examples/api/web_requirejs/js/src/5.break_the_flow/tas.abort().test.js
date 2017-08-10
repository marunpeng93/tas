/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.abort()'],
function(tas, tester, runner) {

	tas(function () {

		var exp1 = 2;
		var val1 = runner.get1();

		var exp2 = 3;
		var val2 = runner.get2();

		var exp = exp1 + exp2;
		var val = val1 + val2;
		tester.test('5.break the flow: tas.abort()', tas, exp, val);
	});
});
