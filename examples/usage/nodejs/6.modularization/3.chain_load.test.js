/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var mc = require('./3.chain_c.js');
var md = require('./3.chain_d.js');

tas(function(){
	var exp = 19;
	var val = mc.get() + md.get();
	test("6.modularization: chain", tas, exp, val);
});