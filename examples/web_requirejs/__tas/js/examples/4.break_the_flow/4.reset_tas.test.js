/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './4.reset_tas'],
function(tas, tester, resetTas) {

	tas(function(){

		var test = tester.test;
		var runner = resetTas;

		var exp = 3;
		var val = runner.get();

		test("4.break the flow: reset tas", tas, exp, val);
	});
});
