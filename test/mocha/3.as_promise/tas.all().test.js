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

describe('as promise: tas.all()', function(){
	it('should return an array', function(done){

		tas.all({
			t1: function(){
				var url = config.res[0];
				request.get(url).end(this.done);
			},

			t2: function(){
				var url = config.res[1];
				request.get(url).end(this.done);
			},

			t3: function(){
				var url = config.res[2];
				request.get(url).end(this.done);
			}
		});

		tas(function(err, data){
			expect(data instanceof Array).to.be.equal(true);
			done();
		});
	});
});
