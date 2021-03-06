/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./return_continue.js');

tas(function(){
	var exp = 5;
	var val = runner.get();
	test('4.forEach tasks: return "continue"', tas, exp, val);
});
