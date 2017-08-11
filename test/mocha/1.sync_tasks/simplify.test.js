/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('1.sync tasks: simplify', function(){
	it('should return 3', function(){

		var a = 1;

		tas(function(){
				a ++; // 2
			},

			function(){
				a ++; // 3
			}
		);

		expect(a).to.be.equal(3);
	});
});
