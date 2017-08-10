/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './4.fix_callback_hell_(pyramid)'],
function(tas, tester, fixCallbackHell) {

	tas(function(){

		var test = tester.test;
		var runner = fixCallbackHell;

		var exp = 3;
		var val = runner.get();

		test("2.async tasks: fix callback hell (pyramid)", tas, exp, val);
	});
});
