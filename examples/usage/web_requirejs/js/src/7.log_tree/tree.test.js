/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tree'],
function(tas, tester, tasTree) {

	tas(function(){

		var test = tester.test;
		var runner = tasTree;

		var exp = 51;
		var val = runner.get();

		test("7.log tree", tas, exp, val);
	});
});
