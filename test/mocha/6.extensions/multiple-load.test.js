/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('promise-all', 'promise-race');
var tester = require('../../__lib/tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('6.extensions: multiple load', function(){
	it('should return 8,6', function(done){

		var test = function(done, count){
			var handlers = [];
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

			tas(function(){
				a ++; // 4
			});

			tas.race({
				t1: function(){
					if (count === 1) {
						a ++; // 5
					}
					var url = config.res.a;
					handlers.push(request.get(url).end(this.done));
				},

				t2: function(){
					a ++; // 6
					var url = config.res.b;
					handlers.push(request.get(url).end(this.done));
				},

				t3: function(){
					a ++; // 7
					var url = config.res.c;
					handlers.push(request.get(url).end(this.done));
				}
			});

			tas(function (err, data){
				tas.cancel(handlers);
				done(count, a + (typeof data === 'object' ? 1 : 0));
			});
		};

		var check = function(results){
			expect(results.toString() === '8,6').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});