/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var object = require('../../../lib/my/object');
var expect = require('chai').expect;

describe('for coverage: lib/my/object.js', function(){

	it('object.get() should return 123', function(){
		object.set(123, 'a');
		expect(object.get('a')).to.be.equal(123);
	});
});
