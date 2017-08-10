/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './1.a_crazy_example'],
function(tas, tester, aCrazyExample) {

	tas(function(){

		var test = tester.test;
		var runner = aCrazyExample;

		var exp = 51;
		var val = runner.get();

		test("7.complex: a crazy example", tas, exp, val);
	});
});
