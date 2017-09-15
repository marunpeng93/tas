/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./use_tas.all_as_promise.all.js');

tas(function(){
	var exp = 'array';
	var val = runner.get() instanceof Array ? 'array' : '';
	test("3.as promise: use tas.all() as promise.all()", tas, exp, val);
});
