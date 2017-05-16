/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './return_break'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 2;
		var val = runner.get();
		tester.test('4.break the flow: return "break"', tas, exp, val);
	});
});
