/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './2.abort_tas'],
function(tas, tester, abortTas) {

	tas(function(){

		var test = tester.test;
		var runner = abortTas;

		var exp = 3;
		var val = runner.get();

		test("5.break the flow: abort tas", tas, exp, val);
	});
});
