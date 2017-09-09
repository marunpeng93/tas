/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = returnAbort;

	var exp = 5;
	var val = 0;

	val += runner.get1(); // 2

	setTimeout(function(){

		// After timeout, the new tasks is not affected by the previous abort.
		val += runner.get2(); // 5

		test('5.break the flow: return "abort"', tas, exp, val);
	}, 0);
});