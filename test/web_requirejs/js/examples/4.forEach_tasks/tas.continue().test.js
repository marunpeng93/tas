/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.continue()'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 2;
		var val = runner.get();
		test('4.forEach tasks: tas.continue()', tas, exp, val);
	});
});
