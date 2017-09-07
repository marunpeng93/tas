/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var config = require('../config');
var expect = require('chai').expect;

describe('2.async tasks: tas.next()', function(){
	it('should return 10,9', function(done){

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

						tas.next(1, 2);
					}, config.waitTime);

					return "await";
				},

				t3: function(a0, a1){
					a += a0; // 5
					a += a1; // 7

					setTimeout(function(){
						tas.next(0, 1, 2);
					}, config.waitTime);

					return "await";
				}
			});

			tas(function (a0, a1, a2){
				a += a0; // 7
				a += a1; // 8
				a += a2; // 10
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '10,9').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
