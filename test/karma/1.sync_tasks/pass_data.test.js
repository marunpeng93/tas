/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('1.sync tasks: pass data', function(){
	it('should return 15', function(){

		var a = 1;

		tas({
			t1: function(){
				return [2];
			},

			t2: function(arg){
				a += arg; // 3
				return [4];
			}
		});

		tas({
			t3: {
				t4: function(arg){
					a += arg; // 7
					return [8];
				}
			}
		});

		tas(function(arg){
			a += arg; // 15
		});

		tas(function(){
			var exp = 15;
			var val = a;
			tester.test('1.sync tasks: pass data', tas, exp, val, true);
			expect(val).toBe(exp);
		});
	});
});
