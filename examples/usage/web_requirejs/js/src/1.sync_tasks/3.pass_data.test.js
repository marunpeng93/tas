/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './3.pass_data'],
function(tas, tester, passData) {

	tas(function(){

		var test = tester.test;
		var runner = passData;

		var exp = 81;
		var val = runner.get();

		test("1.sync tasks: pass data", tas, exp, val);
	});
});
