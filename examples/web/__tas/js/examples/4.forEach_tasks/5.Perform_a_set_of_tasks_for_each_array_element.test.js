/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = useTasForEach;

	var exp = 3;
	var val = runner.get();
	test("3.as promise: Perform a set of tasks for each array element", tas, exp, val);
});
