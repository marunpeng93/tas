/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = tasPromise;

	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: tas.promise()", tas, exp, val);
});
