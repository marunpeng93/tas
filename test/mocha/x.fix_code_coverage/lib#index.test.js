/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('for coverage: lib/index.js', function(){

	it('tas.abort() should return undefined', function(){
		expect(tas.abort()).to.be.equal(undefined);
	});

	it('tas.break should return undefined', function(){
		expect(tas.break()).to.be.equal(undefined);
	});

	it('tas.layer should return 0', function(){
		expect(tas.layer).to.be.equal(0);
	});

	it('tas.maxLayer should return 1', function(){
		expect(tas.maxLayer).to.be.equal(1);
	});

});
