/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var expect = require('chai').expect;

describe('5.break the flow: return "abort"', function(){
	it('should return ,1', function(done){

		var test = function(done, count){
			var a = 0;

			tas.begin();

			tas({
				t1: function t1(){
					if (count === 1) {
						return 'abort';
					}
				},

				t2: function t2(){
					a ++;
				}
			});

			tas(function end(){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === ',1').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
