/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('break the flow: tas.reset()', function(){
	it('should return 3', function(){

		var a = 1;

		tas(function(){

			tas({
				t1: function(){
					[1].forEach(function(){
						tas.abort();
						tas.reset();
					});
				},

				t2: function(){
					a ++; // 2
				}
			});

			tas(function(){
				a ++; // 3
			});
		});

		expect(a).to.be.equal(3);
	});
});
