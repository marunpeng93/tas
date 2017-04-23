/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var obj = require('../../../lib/util/object');
var expect = require('chai').expect;

describe('for coverage: lib/util/object.js', function(){
	it('obj.cloneMethods() should return true', function(){

		var o1 = {f1: function(){}};
		var o2 = {f2: function(){}};

		var o = obj.cloneMethods({}, o1, o2);
		expect(typeof o.f1 === 'function' && typeof o.f2 === 'function').to.be.equal(true);
	});
});
