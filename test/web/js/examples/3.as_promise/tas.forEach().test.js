/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = tasForEach;

	var exp = 9;
	var val = runner.get();
	test("3.as promise: tas.forEach()", tas, exp, val);
});
