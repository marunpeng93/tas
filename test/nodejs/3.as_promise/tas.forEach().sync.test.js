/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./tas.forEach().sync');

tas(function(){
	var exp = 3;
	var val = runner.get();
	test("3.as promise: tas.forEach() with sync", tas, exp, val);
});
