/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('async tasks: tas.next()', function(){
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
			expect(a).toBe(3);
			done();
		});
	});
});
