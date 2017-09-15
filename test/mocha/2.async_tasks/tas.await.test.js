/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var expect = require('chai').expect;

describe('2.async tasks: tas.await()', function(){
	it('should return 6,5', function(done){

		var test = function(done, count){
			var a = 1;

			// After each function execution is completed, Tas will be hanged up,
			// waiting for the async task execution is completed.
			tas.await({
				t1: function(){
					a ++; // 2

					setTimeout(function(){
						if (count === 1) {
							a ++; // 3
						}

						tas.next();
					}, 0);
				},

				t2: function(){
					a ++; // 4

					setTimeout(function(){
						a ++; // 5

						tas.next();
					}, 0);
				}
			});

			tas(function (){
				a ++; // 6
			});

			tas(function (){
				done(count, a);
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
