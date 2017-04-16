/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('break the flow: tas.abort()', function(){
	it('should return 1', function(){

		var a = 1;

		tas(function(){

			tas({
				t1: function(){
					[1].forEach(function(){
						tas.abort();
					});
				},

				t2: function(){
					a ++; // skipped
				}
			});

			tas(function(){
				a ++; // skipped
			});

		});

		expect(a).toBe(1);
	});
});
