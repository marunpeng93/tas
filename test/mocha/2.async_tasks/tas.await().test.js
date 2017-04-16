/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var config = require('../../config');
var expect = require('chai').expect;

describe('async tasks: tas.await()', function(){
	it('should return 3', function(done){

		var a = 1;

		tas.await(function(){
			a ++; // 2

			setTimeout(function(){
				a ++; // 3
				tas.next();
			}, config.time);
		});

		tas(function(){
			expect(a).to.be.equal(3);
			done();
		});
	});
});
