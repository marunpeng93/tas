/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = viaReturn;

	var exp = 24;
	var val = runner.get();
	test("1.sync tasks: return data", tas, exp, val);
});
