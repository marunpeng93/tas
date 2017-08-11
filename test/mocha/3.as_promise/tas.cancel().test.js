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

describe('3.as promise: tas.cancel()', function(){
	it('should return an object', function(done){

		var handlers = [];

		tas.race({
			t1: function(){
				var url = config.res.a;
				handlers.push(request.get(url).end(this.done));
			},

			t2: function(){
				var url = config.res.b;
				handlers.push(request.get(url).end(this.done));
			},

			t3: function(){
				var url = config.res.c;
				handlers.push(request.get(url).end(this.done));
			}
		});

		tas(function(err, data){
			tas.cancel(handlers);
			expect(data instanceof Object).to.be.equal(true);
			done();
		});
	});
});
