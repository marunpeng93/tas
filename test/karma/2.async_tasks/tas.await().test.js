/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('2.async tasks: tas.await()', function(){
	it('should return 3', function(done){

		var a = 1;

		tas.await(function(){
			a ++; // 2

			setTimeout(function(){
				a ++; // 3
				tas.next();
			}, config.waitTime);
		});

		tas(function(){
			var exp = 3;
			var val = a;
			tester.test('2.async tasks: tas.await()', tas, exp, val, true);
			expect(val).toBe(exp);
			done();
		});
	});
});
