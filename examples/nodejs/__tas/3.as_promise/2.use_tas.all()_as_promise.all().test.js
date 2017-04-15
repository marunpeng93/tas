/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var test = require('../../../__lib/tester').test;
var runner = require('./2.use_tas.all()_as_promise.all()');

tas(function(){
    var exp = 'array';
    var val = runner.get() instanceof Array ? 'array' : '';
    test("3.as promise: use tas.all() as promise.all()", tas, exp, val);
});
