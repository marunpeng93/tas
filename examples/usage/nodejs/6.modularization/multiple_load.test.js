/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var ma = require('./multiple_a.js');
var mb = require('./multiple_b.js');

tas(function(){
	var exp = 8;
	var val = ma.get() + mb.get();
	test("6.modularization: multiple", tas, exp, val);
});
