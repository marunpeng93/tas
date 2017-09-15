/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var expect = require('chai').expect;

describe('5.break the flow: tas.abort()', function(){
	it('should return ,1', function(done){

		var test = function(done, count){
			var a = 0;

			// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
			// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
			tas.begin();

			tas({
				t1: function (){
					[1].forEach(function(){
						if (count === 1) {

							// Abort Tas, then the remaining tasks will be ignored.
							// So the value of a will be returned only once (when count is 2).
							tas.abort();
						}
					});
				},

				t2: function (){
					a ++;
				}
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === ',1').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
