/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var expect = require('chai').expect;

describe('5.break the flow: tas.break()', function(){
	it('should return 0,1', function(done){

		var test = function(done, count){
			var a = 0;

			tas({
				t1: function (){
					[1].forEach(function(){
						if (count === 1) {

							// The remaining task(s) in the current tasks will be ignored.
							tas.break();
						}
					});
				},

				t2: function (){ // ignored
					a ++;
				}
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '0,1').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
