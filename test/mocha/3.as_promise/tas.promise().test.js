/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var config = require('../config');
var request = require('superagent');
var expect = require('chai').expect;

describe('3.as promise: tas.promise()', function(){
	it('should return an object', function(done){

		tas.promise(function(){
			var url = config.res.a;
			request.get(url).end(this.done);
		});

		tas(function(err, data){
			expect(data instanceof Object).to.be.equal(true);
			done();
		});
	});
});
