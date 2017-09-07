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

describe('2.async tasks: tas.await()', function(){
	it('should return 6,5', function(done){

		var test = function(done, count){
			var a = 1;

			tas.await({
				t1: function(){
					a ++; // 2

					setTimeout(function(){
						if (count === 1) {
							a ++; // 3
						}

						tas.next();
					}, config.waitTime);
				},

				t2: function(){
					a ++; // 4

					setTimeout(function(){
						a ++; // 5

						tas.next();
					}, config.waitTime);
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

		tester.do(test, check);
	});
});
