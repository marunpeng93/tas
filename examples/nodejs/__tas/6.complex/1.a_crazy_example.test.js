/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./1.a_crazy_example');

tas(function(){
	var exp = 51;
	var val = runner.get();
	test("complex: a crazy example", tas, exp, val);
});
