/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('4.forEach tasks: return "continue"', function(){
	it('should return 2', function(done){

		var a = 0;
		var flag = 0;

		tas(function(){
			var arr = [1, 2];
			return [arr];
		});

		tas.forEach({
			init: function(element){
				//console.log(element);
			},

			check: function(){
				if (flag === 0) {
					flag = 1;
					return "continue";
				}
			},

			calc: function(){
				a ++; // 1 times.
			}
		});

		tas(function(){
			a ++; // 2
		});

		tas(function(){
			var exp = 2;
			var val = a;
			tester.test('4.forEach tasks: return "continue"', tas, exp, val, true);
			expect(val).toBe(exp);
			done();
		});
	});
});
