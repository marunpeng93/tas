/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './3.chain_c', './3.chain_d'],
function(tas, tester, moduleChainC, moduleChainD) {

	tas(function(){

		var test = tester.test;
		var mc = moduleChainC;
		var md = moduleChainD;

		var exp = 19;
		var val = mc.get() + md.get();

		test("6.modularization: chain", tas, exp, val);
	});
});
