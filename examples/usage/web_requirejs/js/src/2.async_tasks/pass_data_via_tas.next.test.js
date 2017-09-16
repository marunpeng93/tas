/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './pass_data_via_tas.next'],
function(tas, tester, passDataViaTasNext) {

	tas(function () {

		var test = tester.test;
		var runner = passDataViaTasNext;

		var exp = 20;
		var val = runner.get();

		test("2.async tasks: pass data via tas.next()", tas, exp, val);
	});
});
