/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./3.via_this');

tas(function(){
	var exp = 5;
	var val = runner.get();
	test("1.pass the data: via this", tas, exp, val);
});
