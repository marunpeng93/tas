/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './1.easier_to_use_than_promise'],
function(tas, tester, easierToUseThanPromise) {

	tas(function(){

		var test = tester.test;
		var runner = easierToUseThanPromise;

		var exp = 'object';
		var val = typeof runner.get();

		test("3.as promise: easier to use than promise", tas, exp, val);
	});
});
