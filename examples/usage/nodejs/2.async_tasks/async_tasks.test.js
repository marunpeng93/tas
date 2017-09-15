/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./async_tasks.js');

tas(function(){
	var exp = 8;
	var val = runner.get();
	test("2.async tasks: async tasks", tas, exp, val);
});
