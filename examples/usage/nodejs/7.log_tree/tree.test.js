/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./tree.js');

tas(function(){
	var exp = 51;
	var val = runner.get();
	test("7.log tree", tas, exp, val);
});
