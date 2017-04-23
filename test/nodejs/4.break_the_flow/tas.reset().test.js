/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./tas.reset()');

tas(function(){

	// The following code will not be executed,
	// because Tas was broken in runner.
	var exp = 3;
	var val = runner.get();
	test('4.break the flow: tas.reset()', tas, exp, val);
});
