/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('5.break the flow: abort in tas.promise()', function(){
	it('should return ,1', function(done){

		var test = function(done, count){
			var a = 0;

			tas.promise('begin', function (){
				var url = config.res.a;

				request.get(url).end(function (err, data){
					if (count === 1) {
						tas.abort();
					}
					else {
						tas.resolve(data);
					}
				});
			});

			tas(function (data){
				a ++;
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === ',1').to.be.equal(true);
			done();
		};

		tester.do(test, check);
	});
});
