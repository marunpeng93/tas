/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = tasAbort;

	var exp = 1;
	var val = runner.get();

	var exp1 = 3;
	var val1 = runner.get1();
	test('5.break the flow: tas.abort()', tas, exp1, val1);
});
