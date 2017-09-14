/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var expect = require('chai').expect;

describe('5.break the flow: abort in tas.await()', function(){
	it('should return ,2', function(done){

		var test = function(done, count){
			var a = 0;

			tas.await('begin', {
				t1: function (){
					setTimeout(function (){
						if (count === 1) {
							tas.abort();
						}
						else {
							tas.next();
						}
					}, 0);
				},

				t2: function (){
					a ++;
					tas.next();
				}
			});

			tas.await(function(){
				a ++;
				setTimeout(function (){
					tas.next();
				}, 0);
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === ',2').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
