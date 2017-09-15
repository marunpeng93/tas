/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./return_break.js');

tas(function(){
	var exp = 2;
	var val = runner.get();
	test('5.break the flow: return "break"', tas, exp, val);
});
