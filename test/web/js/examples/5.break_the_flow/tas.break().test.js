/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = tasBreak;

	var exp = 2;
	var val = runner.get();
	test("4.break the flow: tas.break()", tas, exp, val);
});
