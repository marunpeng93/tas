/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var mc = moduleChainC;
	var md = moduleChainD;

	var exp = 19;
	var val = mc.get() + md.get();
	test("5.modularization: chain", tas, exp, val);
});
