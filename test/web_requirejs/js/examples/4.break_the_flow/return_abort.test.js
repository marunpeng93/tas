/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './return_abort'],
function(tas, tester, runner) {

	tas(function () {

		// The following code will not be executed,
		// because Tas was broken in runner.
		var exp = 1;
		var val = runner.get();
		tester.test('4.break the flow: return "break"', tas, exp, val);
	});
});
