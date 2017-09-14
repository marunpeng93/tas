/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('promise-all');
var tester = require('../../__lib/tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('5.break the flow: abort in tas.all()', function(){
	it('should return ,4', function(done){

		var test = function(done, count){
			var a = 0;

			tas.begin();

			tas.all({
				t1: function(){
					if (count === 1) {

						// Abort Tas, then the remaining tasks will be ignored.
						// So the value of a will be returned only once (when count is 2).
						return this.abort();
					}

					a ++; // 1
					var url = config.res.a;
					request.get(url).end(this.done);
				},

				t2: function(){
					a ++; // 2
					var url = config.res.b;
					request.get(url).end(this.done);
				},

				t3: function(){
					a ++; // 3
					var url = config.res.c;
					request.get(url).end(this.done);
				}
			});

			tas(function(err, data){
				a ++; // 4
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === ',4').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
