/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = thisDone;

	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: this.done", tas, exp, val);
});
