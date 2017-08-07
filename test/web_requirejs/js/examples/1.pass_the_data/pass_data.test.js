/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './pass_data'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 15;
		var val = runner.get();
		tester.test("1.pass the data: via return", tas, exp, val);
	});
});
