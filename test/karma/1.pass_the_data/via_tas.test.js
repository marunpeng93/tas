/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('pass the data: via tas', function(){
	it('should return 5', function(){

		var a = 1;

		tas({
			t1: function(){
				tas.a = 1;
			},

			t2: {
				t3: function(){
					tas.a ++; // 2
				},

				t4: function(){
					[1].forEach(function(){
						tas.a ++; // 3
					});

					tas.a ++; // 4
				}
			},

			t5: function(){
				tas.a ++; // 5
			}
		});

		tas(function(){
			a = tas.a;
		});

		expect(a).toBe(5);
	});
});
