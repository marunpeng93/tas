/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.await()'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 3;
		var val = runner.get();
		tester.test("2.async tasks: tas.await()", tas, exp, val);
	});
});
