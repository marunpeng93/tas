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

describe('3.as promise: this.done', function(){
	it('should return 6,5', function(done){

		this.timeout(config.netTimeout);

		var test = function(done, count){
			var a = 0;

			// Perform all tasks at the same time.
			tas.all({
				t1: function(){
					if (count === 1) {
						a ++; // 1
					}
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

			// When all tasks execution is completed, then continue.
			// The total waiting time is the longest task time.
			tas(function (err, data){
				done(count, a + data.length);
			});
		};

		var check = function(results){
			expect(results.toString() === '6,5').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
