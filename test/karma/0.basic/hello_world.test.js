/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('basic: hello world', function(){
	it('should return 3', function(){

		var a = 1;

		tas("hello world", {
			t1: function(){
				a ++; // 2
			},

			t2: function(){
				a ++; //3
			}
		});

		tas(function(){
			var exp = 3;
			var val = a;
			tester.test('basic: hello world', tas, exp, val, true);
			expect(val).toBe(exp);
		});
	});
});
