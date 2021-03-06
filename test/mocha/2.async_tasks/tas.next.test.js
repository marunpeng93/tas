/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var expect = require('chai').expect;

describe('2.async tasks: tas.next()', function(){
	it('should return 21,20', function(done){

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

						// Pass a parameter
						tas.next(1);
					}, 0);

					return "await";
				},

				t3: function(a0){
					a += a0; // 5

					setTimeout(function(){

						// Pass multiple parameters
						tas.next(0, 1);
					}, 0);

					return "await";
				},

				t4: function(a0, a1){
					a += a0; // 5
					a += a1; // 6
				},

				t5: function(){
					setTimeout(function(){

						// Pass multiple parameters
						tas.next(2, 3, 4);
					}, 0);

					return "await";
				}
			});

			tas.await({
				t1: function (a0, a1, a2){
					a += a0; // 8
					a += a1; // 11
					a += a2; // 15

					setTimeout(function(){
						var arr = [1, 2, 3];

						// Pass an array parameter.
						tas.next(arr);
					}, 0);
				},

				t2: function (arr){
					arr.forEach(function(e){
						a += e;
					});

					setTimeout(function(){

						// Pass nothing, just go to the next task.
						tas.next();
					}, 0);
				}
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '21,20').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
