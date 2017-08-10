/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../../lib');
var test = require('../../../../__lib/tester').test;
var ma = require('./2.multiple_a.js');
var mb = require('./2.multiple_b.js');

tas(function(){
	var exp = 8;
	var val = ma.get() + mb.get();
	test("6.modularization: multiple", tas, exp, val);
});
