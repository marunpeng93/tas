/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// tas.forEach() is an extension of Tas, we need to load it at the first.
var tas = require('../tas').load('forEach');

var tester = require('../tester');
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

			// Perform a set of tasks for each array element
			tas.forEach({
				init: function(element){
					a += element;
				},

				check: function(){
					if (flag === 0) {
						flag = 1;

						[1, 2, 3].forEach(function(){

							// Ignore the remaining tasks, and go to init() for next loop.
							tas.continue();
						});
					}
				},

				calc: function(){ // ignored when flag === 0
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

		// Run the test twice
		tester.do(test, check, 2);
	});
});
