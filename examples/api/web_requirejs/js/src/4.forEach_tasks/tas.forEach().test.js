/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.forEach()'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 9;
		var val = runner.get();
		tester.test("4.forEach tasks: tas.forEach()", tas, exp, val);
	});
});
