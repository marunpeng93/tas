/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./Perform_a_set_of_tasks_for_each_array_element.js');

tas(function(){
	var exp = 3;
	var val = runner.get();
	test("4.forEach tasks: Perform a set of tasks for each array element", tas, exp, val);
});
