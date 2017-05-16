/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var bool = require('../../../lib/my/boolean');
var expect = require('chai').expect;

describe('for coverage: lib/my/boolean.js', function(){
	it('bool.clear() should return undefined', function(){
		expect(bool.clear()).to.be.equal(undefined);
	});

	it('bool.reset() should return undefined', function(){
		expect(bool.reset()).to.be.equal(undefined);
	});
});
