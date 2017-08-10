/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../../lib');
var test = require('../../../../__lib/tester').test;
var runner = require('./4.fix_callback_hell_(pyramid).js');

tas(function(){
	var exp = 7;
	var val = runner.get();
	test("2.async tasks: fix callback hell (pyramid)", tas, exp, val);
});
