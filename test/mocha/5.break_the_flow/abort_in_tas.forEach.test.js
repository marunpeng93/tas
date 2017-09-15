/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas').load('forEach');
var tester = require('../tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('5.break the flow: abort in tas.forEach()', function(){
	it('should return ,5', function(done){

		this.timeout(config.netTimeout);

		var test = function(done, count){
			var a = 0;

			// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
			// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
			tas.begin();

			tas.await(function(){
				var url = config.res.array;

				request.get(url).end(function(err, data){
					if (err) return tas.abort(err);

					var arr = JSON.parse(data.text).data;
					tas.next(arr);
				});
			});

			tas.forEach({
				init: function init(element, index){
					a ++; // 2 times
				},

				async: function async(){
					setTimeout(function timeout1(){

						tas.next();

					}, 0);
					return "await";
				},

				calc: function calc(){
					if (count === 1) {

						// Abort Tas, then the remaining tasks will be ignored.
						// So the value of a will be returned only once (when count is 2).
						tas.abort();
					}
					else {
						a ++;
					}
				}
			});

			tas(function(){
				a ++; // 5
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === ',5').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
