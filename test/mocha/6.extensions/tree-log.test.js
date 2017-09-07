/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('tree');
var log = tas.logTree;

var tester = require('../../__lib/tester');
var expect = require('chai').expect;

describe('6.extensions: tree log', function(){
	it('should return 4,3', function(done){

		var test = function(done, count){
			var a = 0;

			tas.enableLogTree(true);
			tas.setIsShowLogTree(false);

			tas.await({
				t1: function(){
					a ++; // 1

					log('waiting...');
					setTimeout(function(){
						if (count === 1) {
							a ++; // 2
						}

						log('t2');
						log('continue...');

						tas.next();
					}, 0);
				},

				t3: function t3(){
					a ++; // 3
					tas.next();
				}
			});

			tas(function t4(){
				a ++; // 4
			});

			tas(function (){
				done(count, a);
			});
		};

		var check = function(results){
			expect(results.toString() === '4,3').to.be.equal(true);
			tas.enableLogTree(false);
			tas.setIsShowLogTree(true);
			done();
		};

		tester.do(test, check);
	});
});
