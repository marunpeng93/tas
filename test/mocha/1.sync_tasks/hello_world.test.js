/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var expect = require('chai').expect;

describe('1.sync_tasks: hello world', function(){
	it('should return 5,4', function(done){

		var test = function(done, count){
			var a = 0;

			tas(function(){
				a ++; // 1
			});

			tas({
				t1: function(){
					a ++; // 2
				},

				t2: {
					t3: function(){
						if (count === 1) {
							a ++; // 3
						}
					},

					t4: function(){
						a ++; // 4
					}
				},

				t5: function(){
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
