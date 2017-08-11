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

describe('4.forEach tasks: tas.forEach()', function(){
	it('should return 9', function(done){

		var a = 0;

		tas.promise(function(){
			var url = config.res.array;
			request.get(url).end(this.done);
		});

		tas(function(err, data){
			var arr = JSON.parse(data.text).data;
			return [arr];
		});

		tas.forEach({
			init: function(element){
				//console.log(element);
			},

			async: function(){
				setTimeout(function(){
					a ++; // 2 times.
					tas.next();
				}, 200);
				return "await";
			},

			calc: function(){
				a ++; // 2 times.
			},

			async2: function(){
				setTimeout(function(){
					a ++; // 2 times.
					tas.next();
				}, 200);
				return "await";
			},

			calc2: function(){
				a ++; // 2 times.
			}
		});

		tas(function(){
			a ++; // 9
		});

		tas(function(){
			expect(a).to.be.equal(9);
			done();
		});
	});
});
