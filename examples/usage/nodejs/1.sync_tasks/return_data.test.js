/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./return_data.js');

tas(function(){
	var exp = 24;
	var val = runner.get();
	test("1.sync tasks: return data", tas, exp, val);
});
