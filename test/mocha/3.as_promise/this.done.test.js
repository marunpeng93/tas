/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('promise-all');
var tester = require('../../__lib/tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('3.as promise: this.done', function(){
	it('should return 6,5', function(done){

		var test = function(done, count){
			var a = 0;

			tas.all({
				t1: function(){
					if (count === 1) {
						a ++; // 1
					}
					var url = config.res.a;
					request.get(url).end(this.done);
				},

				t2: function(){
					a ++; // 2
					var url = config.res.b;
					request.get(url).end(this.done);
				},

				t3: function(){
					a ++; // 3
					var url = config.res.c;
					request.get(url).end(this.done);
				}
			});

			tas(function (err, data){
				done(count, a + data.length);
			});
		};

		var check = function(results){
			expect(results.toString() === '6,5').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
