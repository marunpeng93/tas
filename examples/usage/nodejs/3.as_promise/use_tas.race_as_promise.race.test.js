/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var test = require('../tester').test;
var runner = require('./use_tas.race_as_promise.race.js');

tas(function(){
	var exp = 'object';
	var val = typeof runner.get();
	test("3.as promise: use tas.race() as promise.race()", tas, exp, val);
});
