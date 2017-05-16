/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var string = require('../../../lib/my/string');
var expect = require('chai').expect;

describe('for coverage: lib/my/string.js', function(){
	it('string.repeat() should return ~~', function(){
		var abc = Object.create(string);
		var val = 'abc';
		abc.save(val);
		expect(abc.get()).to.be.equal(val);
	});

	it('string.clear() should return undefined', function(){
		expect(string.clear()).to.be.equal(undefined);
	});

	it('string.reset() should return undefined', function(){
		expect(string.reset()).to.be.equal(undefined);
	});
});
