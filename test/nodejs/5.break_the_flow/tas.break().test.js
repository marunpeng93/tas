/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./tas.break()');

tas(function(){
	var exp = 2;
	var val = runner.get();
	test("4.break the flow: tas.break()", tas, exp, val);
});
