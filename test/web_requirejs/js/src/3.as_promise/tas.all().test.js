/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../tester', './tas.all()'],
function(tas, tester, runner) {

	tas(function () {
		var exp = 'array';
		var val = runner.get() instanceof Array ? 'array' : '';
		tester.test("3.as promise: tas.all()", tas, exp, val);
	});
});
