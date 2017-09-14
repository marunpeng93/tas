/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var expect = require('chai').expect;

describe('2.async tasks: tas.next()', function(){
	it('should return 16,15', function(done){

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
					}, 0);

					return "await";
				},

				t3: function(a0, a1){
					a += a0; // 5
					a += a1; // 7

					setTimeout(function(){
						tas.next(0, 1, 2);
					}, 0);

					return "await";
				}
			});

			tas.await(function (a0, a1, a2){
				a += a0; // 7
				a += a1; // 8
				a += a2; // 10

				setTimeout(function(){
					tas.next([1, 2, 3]);
				}, 0);
			});

			tas(function (arr){
				arr.forEach(function(e){
					a += e;
				});
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '16,15').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
