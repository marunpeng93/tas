/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./pass_data_via_tas.next.js');

tas(function(){
	var exp = 20;
	var val = runner.get();
	test("2.async tasks: pass data via tas.next()", tas, exp, val);
});
