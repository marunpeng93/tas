/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var ma = require('./common_a.js');

tas(function(){
	var exp = 1;
	var val = ma.get();
	test("6.modularization: common", tas, exp, val);
});
