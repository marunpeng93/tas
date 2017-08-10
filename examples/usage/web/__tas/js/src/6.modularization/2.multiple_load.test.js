/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var ma = moduleMultipleA;
	var mb = moduleMultipleB;

	var exp = 8;
	var val = ma.get() + mb.get();
	test("6.modularization: multiple", tas, exp, val);
});
