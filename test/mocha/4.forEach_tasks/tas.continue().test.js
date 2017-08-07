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

describe('forEach tasks: tas.continue()', function(){
	it('should return 5', function(done){

		var a = 0;
		var flag = 0;

		tas(function(){
			var arr = [1, 2];
			return [arr];
		});

		tas.forEach({
			init: function(element){
				//console.log(element);
				a += element;
			},

			check: function(){
				if (flag === 0) {
					flag = 1;

					[1, 2, 3].forEach(function(){
						tas.continue();
					});
				}
			},

			calc: function(){
				a ++; // 1 times.
			}
		});

		tas(function(){
			a ++; // 5
		});

		tas(function(){
			expect(a).to.be.equal(5);
			done();
		});
	});
});
