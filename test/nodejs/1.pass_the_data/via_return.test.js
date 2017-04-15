/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./via_return');

tas(function(){
	var exp = 15;
	var val = runner.get();
	test("1.pass the data: via return", tas, exp, val);
});
