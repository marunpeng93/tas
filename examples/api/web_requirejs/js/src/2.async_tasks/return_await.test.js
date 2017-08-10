/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './return_await'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 5;
		var val = runner.get();
		tester.test('2.async tasks: return "await"', tas, exp, val);
	});
});
