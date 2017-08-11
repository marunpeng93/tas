/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('2.async tasks: return "await"', function(){
	it('should return 5', function(done){

		var a = 1;

		tas({
			t1: function(){
				a ++; // 2
			},

			t2: function(){
				a ++; // 3

				setTimeout(function(){
					a ++; // 4

					tas.next();
				}, config.waitTime);

				return "await";
			},

			t3: function(){
				a ++; // 5
			}
		});

		tas(function(){
			var exp = 5;
			var val = a;
			tester.test('2.async tasks: return "await"', tas, exp, val, true);
			expect(val).toBe(exp);
			done();
		});
	});
});

