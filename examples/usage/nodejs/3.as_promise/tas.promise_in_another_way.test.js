/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./tas.promise_in_another_way.js');

tas(function(){
	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: tas.promise in another way", tas, exp, val);
});
