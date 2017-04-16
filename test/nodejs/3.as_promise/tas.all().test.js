/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./tas.all()');

tas(function(){
	var exp = 'array';
	var val = runner.get() instanceof Array ? 'array' : '';
	test("3.as promise: tas.all()", tas, exp, val);
});
