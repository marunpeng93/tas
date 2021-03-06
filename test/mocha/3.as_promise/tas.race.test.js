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

describe('3.as promise: tas.race()', function(){
	it('should return 4,3', function(done){

		this.timeout(config.netTimeout);

		var test = function(done, count){
			var handlers = [];
			var a = 0;

			// Perform all tasks at the same time.
			tas.race({
				t1: function(){
					if (count === 1) {
						a ++; // 1
					}
					var url = config.res.a;
					handlers.push(request.get(url).end(this.done));
				},

				t2: function(){
					a ++; // 2
					var url = config.res.b;
					handlers.push(request.get(url).end(this.done));
				},

				t3: function(){
					a ++; // 3
					var url = config.res.c;
					handlers.push(request.get(url).end(this.done));
				}
			});

			// When one of tasks execution is completed, then continue.
			// The total waiting time is the longest task time
			// because the other tasks are not canceled.

			// If you want to cancel other tasks that have not yet been completed,
			// see "tas.cancel.test.js" for more details.
			tas(function (err, data){
				done(count, a + (typeof data === 'object' ? 1 : 0));
			});
		};

		var check = function(results){
			expect(results.toString() === '4,3').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
