/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './1.common_a'],
function(tas, tester, moduleCommonA) {

	tas(function(){

		var test = tester.test;
		var ma = moduleCommonA;

		var exp = 1;
		var val = ma.get();

		test("5.modularization: common", tas, exp, val);
	});
});
