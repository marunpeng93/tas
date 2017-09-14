/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('forEach');
var tester = require('../../__lib/tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('4.forEach tasks: tas.forEach()', function(){
	it('should return 9,7', function(done){

		var test = function(done, count){
			var a = 0;

			tas.await('begin', function(){
				var url = config.res.array;

				request.get(url).end(function(err, data){
					if (err) return tas.abort(err);

					var arr = JSON.parse(data.text).data;
					tas.next(arr);
				});
			});

			tas.forEach({
				init: function init(element, index){
					a ++; // 2 times
				},

				async: function async(){
					setTimeout(function timeout1(){

						tas.next();

					}, 0);
					return "await";
				},

				calc: function calc(){
					if (count === 1) {
						a ++; // 2 times
					}
				},

				async2: function async2(){
					setTimeout(function timeout2(){
						a ++; // 2 times

						tas.next();

					}, 0);
					return "await";
				},

				calc2: function calc2(){
					a ++; // 2 times
				}
			});

			tas(function(){
				a ++; // 9
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '9,7').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
