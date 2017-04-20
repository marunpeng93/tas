/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('basic: simplify', function(){
	it('should return 3', function(){

		var a = 1;

		tas(function(){
				a ++; // 2
			},

			function(){
				a ++; // 3
			}
		);

		tas(function(){
			var exp = 3;
			var val = a;
			tester.test('basic: simplify', tas, exp, val, true);
			expect(val).toBe(exp);
		});
	});
});
