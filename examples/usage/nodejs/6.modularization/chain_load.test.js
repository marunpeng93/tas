/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var mc = require('./chain_c.js');
var md = require('./chain_d.js');

tas(function(){
	var exp = 19;
	var val = mc.get() + md.get();
	test("6.modularization: chain", tas, exp, val);
});
