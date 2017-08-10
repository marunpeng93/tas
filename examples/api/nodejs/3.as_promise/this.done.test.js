/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./this.done.js');

tas(function(){
	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: this.done", tas, exp, val);
});
