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

describe('4.forEach tasks: tas.breakForEach()', function(){
	it('should return 2,6', function(done){

		var test = function(done, count){
			var a = 0;

			tas(function () {
				var arr = [1, 2];
				return [arr];
			});

			// Perform a set of tasks for each array element
			tas.forEach({
				init: function (element) {
					a += element;
				},

				check: function () {
					[1].forEach(function(){
						if (count === 1) {

							// Break tas.forEach(), go to the next task
							tas.breakForEach();
						}
					});
				},

				calc: function () { // ignored
					a++;
				}
			});

			tas(function () {
				a++;
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '2,6').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
