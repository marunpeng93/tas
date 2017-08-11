/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('1.sync tasks: simplify', function(){
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
			tester.test('1.sync tasks: simplify', tas, exp, val, true);
			expect(val).toBe(exp);
		});
	});
});
