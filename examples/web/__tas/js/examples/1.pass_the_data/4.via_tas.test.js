/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

	var test = tester.test;
	var runner = viaTas;

	var exp = 7;
	var val = runner.get();
	test("1.pass the data: via tas", tas, exp, val);
});
