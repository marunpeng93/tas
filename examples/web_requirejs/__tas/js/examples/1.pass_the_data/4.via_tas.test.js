/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './4.via_tas'],
function(tas, tester, viaTas) {

	tas(function(){

		var test = tester.test;
		var runner = viaTas;

		var exp = 7;
		var val = runner.get();

		test("1.pass the data: via tas", tas, exp, val);
	});
});
