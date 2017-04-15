/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	// The following code will not be executed,
	// because Tas was broken in runner.

	var test = tester.test;
	var runner = tasAbort;

	var exp = 1;
	var val = runner.get();
	test('4.break the flow: tas.abort()', tas, exp, val);
});
