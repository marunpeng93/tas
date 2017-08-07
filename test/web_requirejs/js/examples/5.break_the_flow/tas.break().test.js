/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.break()'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 2;
		var val = runner.get();
		tester.test("5.break the flow: tas.break()", tas, exp, val);
	});
});
