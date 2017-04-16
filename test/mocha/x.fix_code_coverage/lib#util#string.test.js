/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var string = require('../../../lib/util/string');
var expect = require('chai').expect;

describe('for coverage: lib/my/array.js', function(){
	it('string.repeat() should return ~~', function(){
		expect(string.repeat('~', 2)).to.be.equal('~~');
	});
});
