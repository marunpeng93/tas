/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('5.break the flow: abort in tas.promise()', function(){
	it('should return ,1', function(done){

		this.timeout(config.netTimeout);

		var test = function(done, count){
			var a = 0;

			// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
			// https://github.com/tasjs/tas/blob/master/doc/execution-order/concurrency-order.md
			tas.begin();

			tas.promise(function (){
				var url = config.res.a;

				request.get(url).end(function (err, data){
					if (count === 1) {

						// Abort Tas, then the remaining tasks will be ignored.
						// So the value of a will be returned only once (when count is 2).
						tas.abort();
					}
					else {
						tas.resolve(data);
					}
				});
			});

			tas(function (data){ // ignored when count === 1
				a ++;
			});

			tas(function (){ // ignored when count === 1
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
