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

describe('as promise: this.done', function(){
	it('should return an object', function(done){

		tas.promise("tas promise", function(){
			request.get(config.root + 'examples/__res/pics/a.json').end(this.done);
		});

		tas(function(err, data){
			expect(data).to.be.an.instanceof(Object);
			done();
		});
	});
});
