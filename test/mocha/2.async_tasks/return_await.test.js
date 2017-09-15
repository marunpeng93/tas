/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var expect = require('chai').expect;

describe('2.async tasks: return "await"', function(){
	it('should return 5,4', function(done){

		var test = function(done, count){
			var a = 1;

			tas({
				t1: function(){
					a ++; // 2
				},

				t2: function(){
					a ++; // 3

					setTimeout(function(){
						if (count === 1) {
							a ++; // 4
						}

						tas.next();
					}, 0);

					// Hang up Tas, waiting for the async task execution is completed.
					return "await";
				},

				t3: function(){
					a ++; // 5
				}
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '5,4').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
