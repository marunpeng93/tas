/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.reset()'],
function(tas, tester, runner) {

	tas(function () {

		var exp = 3;
		var val = runner.get();
		tester.test('4.break the flow: tas.reset()', tas, exp, val);
	});
});
