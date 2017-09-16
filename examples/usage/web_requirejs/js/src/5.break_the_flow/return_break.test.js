/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './return_break'],
function(tas, tester, retrunBreak) {

	tas(function(){

		var test = tester.test;
		var runner = retrunBreak;

		var exp = 2;
		var val = runner.get();

		test("5.break the flow: return 'break'", tas, exp, val);
	});
});
