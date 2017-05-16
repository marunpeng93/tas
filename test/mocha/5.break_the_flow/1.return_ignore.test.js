/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('break the flow: return "ignore"', function(){
	it('should return 2', function(){

		tas(function(){
			var a = 1;

			tas(function () {
				return "ignore";
				a ++; // skipped
			});

			tas.await(function () {
				return "ignore";
				a ++; // skipped
			});

			tas(function(){
				a ++; // 2
			});

			expect(a).to.be.equal(2);
		});
	});
});
