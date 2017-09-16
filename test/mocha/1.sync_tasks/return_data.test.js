/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var expect = require('chai').expect;

describe('1.sync_tasks: pass data', function(){
	it('should return 24,22', function(done){

		var test = function(done, count){
			var a = 1;

			tas({
				t1: function(){
					// Return a parameter
					if (count === 1) {
						return 2;
					}
					else {
						return 0;
					}
				},

				t2: function(arg){
					a += arg; // 3

					// Return multiple parameters
					return [4, 5];
				}
			});

			tas({
				t3: {
					t4: function(a0, a1){
						a += a0; // 7
						a += a1; // 12

						// Return nothing
					},

					t5: {
						t6: function(a0){
							if (typeof a0 !== 'undefined') {
								a ++;
							}

							// Return multiple parameters
							return [1, 2, 3];
						},

						t7: function(a0, a1, a2){
							a += a0; // 13
							a += a1; // 15
							a += a2; // 18

							var arr = [1, 2, 3];

							// Return an array parameter, note that we must wrap it with [].
							return [arr];
						}
					}
				}
			});

			tas(function(arr){
				arr.forEach(function(e){
					a += e;
				});
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '24,22').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
