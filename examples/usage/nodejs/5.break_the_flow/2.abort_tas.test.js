/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./2.abort_tas.js');

tas(function(){
	var exp = 3;
	var val = runner.get();
	test("5.break the flow: abort tas", tas, exp, val);
});
