/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('5.break the flow: return "abort"', function(){
	it('should return 1', function(done){

		setTimeout(function(){
			var a = 1;

			tas({
				t1: function(){
					return 'abort';
				},

				t2: function(){
					a ++; // skipped
				}
			});

			tas(function(){
				a ++; // skipped
			});

			var exp = 1;
			var val = a;
			tester.test('5.break the flow: return "abort"', tas, exp, val, true);
			expect(val).toBe(exp);

			done();
		}, 0);
	});
});
