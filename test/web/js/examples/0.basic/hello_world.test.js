/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = helloWorld;

	var exp = 3;
	var val = runner.get();
	test("0.basic: hello world", tas, exp, val);
});
