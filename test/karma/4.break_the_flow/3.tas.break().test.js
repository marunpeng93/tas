/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('break the flow: tas.break()', function(){
	it('should return 2', function(){

		var a = 1;

		tas({
			t1: function(){
				[1].forEach(function(){
					tas.break();
				});
			},

			t2: function(){
				a ++; // skipped
			}
		});

		tas(function(){
			a ++; // 2
		});

		tas(function(){
			var exp = 2;
			var val = a;
			tester.test('break the flow: tas.break()', tas, exp, val, true);
			expect(val).toBe(exp);
		});
	});
});
