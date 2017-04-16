/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('break the flow: return "abort"', function(){
    it('should return 0', function(){
        expect(tas.layer).to.be.equal(0);
    });

	it('should return 1', function(){
		expect(tas.maxLayer).to.be.equal(1);
	});

});
