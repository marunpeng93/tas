/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./2.break_the_current_tasks');

tas(function(){
	var exp = 2;
	var val = runner.get();
	test("4.break the flow: break the current tasks", tas, exp, val);
});
