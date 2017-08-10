/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../../lib');
var test = require('../../../../__lib/tester').test;
var runner = require('./4.cancel_the_unfinished_tasks.js');

tas(function(){
	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: cancel the unfinished tasks", tas, exp, val);
});
