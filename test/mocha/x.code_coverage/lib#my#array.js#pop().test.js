/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('for coverage: lib/index.js/basic.abort()', function(){
	it('should return undefined', function(){
		expect(tas.abort()).to.be.equal(undefined);
	});
});
