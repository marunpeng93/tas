/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var num = require('../../../lib/my/number');
var expect = require('chai').expect;

describe('for coverage: lib/my/array.js', function(){
	it('num.save() should return undefined', function(){
		expect(num.save(1)).to.be.equal(undefined);
	});

	it('num.get() should return 1', function(){
		expect(num.get()).to.be.equal(1);
	});

});
