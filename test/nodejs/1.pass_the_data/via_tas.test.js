/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var test = require('../../../examples/__lib/tester').test;
var runner = require('./via_tas');

tas(function(){
	var exp = 7;
	var val = tas.a;
	test("1.pass the data: via tas", tas, exp, val);
});
