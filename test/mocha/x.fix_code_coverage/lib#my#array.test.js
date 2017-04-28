/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var arr = require('../../../lib/my/array');
var expect = require('chai').expect;

describe('for coverage: lib/my/array.js', function(){
	it('arr.pop() should return undefined', function(){
		expect(arr.pop()).to.be.equal(undefined);
	});

	it('arr.push() should return undefined', function(){
		expect(arr.push()).to.be.equal(undefined);
	});

	it('arr.shift() should return undefined', function(){
		expect(arr.shift()).to.be.equal(undefined);
	});

	it('arr.unshift() should return undefined', function(){
		expect(arr.unshift()).to.be.equal(undefined);
	});

	it('arr.clear() should return undefined', function(){
		expect(arr.clear()).to.be.equal(undefined);
	});

});
