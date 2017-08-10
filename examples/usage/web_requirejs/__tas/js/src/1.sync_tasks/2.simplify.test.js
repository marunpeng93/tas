/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './2.simplify'],
function(tas, tester, simplify){

	tas(function(){

		var test = tester.test;
		var runner = simplify;

		var exp = 3;
		var val = runner.get();

		test("1.sync tasks: simplify", tas, exp, val);
	});
});
