/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var ma = require('./1.common_a');

tas(function(){
	var exp = 1;
	var val = ma.get();
	test("5.modularization: common", tas, exp, val);
});
