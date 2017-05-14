/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var string = require('../../../lib/my/string');
var expect = require('chai').expect;

describe('for coverage: lib/util/string.js', function(){
	it('string.repeat() should return ~~', function(){
		var abc = Object.create(string);
		var val = 'abc';
		abc.save(val);
		expect(abc.get()).to.be.equal(val);
	});
});
