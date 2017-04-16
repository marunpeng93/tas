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

		expect(a).toBe(3);
	});
});
