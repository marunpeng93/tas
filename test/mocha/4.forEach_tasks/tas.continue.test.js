/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('forEach');
var tester = require('../../__lib/tester');
var expect = require('chai').expect;

describe('4.forEach tasks: tas.continue()', function(){
	it('should return 5,4', function(done){

		var test = function(done, count){
			var a = 0;
			var flag = 0;

			tas(function(){
				var arr = [1, 2];
				return [arr];
			});

			tas.forEach({
				init: function(element){
					a += element;
				},

				check: function(){
					if (flag === 0) {
						flag = 1;

						[1, 2, 3].forEach(function(){
							tas.continue();
						});
					}
				},

				calc: function(){
					if (count === 1) {
						a ++;
					}
				}
			});

			tas(function(){
				a ++; // 5
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '5,4').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
