/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./use_tas.cancel_to_cancel_the_unfinished_tasks.js');

tas(function(){
	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: cancel the unfinished tasks", tas, exp, val);
});
