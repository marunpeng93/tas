/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./tas.forEach()');

tas(function(){
	var exp = 9;
	var val = runner.get();
	test("4.forEach tasks: tas.forEach()", tas, exp, val);
});
