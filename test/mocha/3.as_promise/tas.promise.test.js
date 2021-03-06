/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var tester = require('../tester');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('3.as promise: tas.promise()', function(){
	it('should return ,1', function(done){

		this.timeout(config.netTimeout);

		var test = function(done, count){
			var a = 0;

			tas.promise(function (){
				var url = config.res.a;

				request.get(url).end(function (err, data){
					if (count === 1) {
						a ++;
					}
					tas.resolve(data);
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
			expect(results.toString() === '2,1').to.be.equal(true);
			done();
		};

		// Run the test twice
		tester.do(test, check, 2);
	});
});
