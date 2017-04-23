/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('as promise: tas.forEach()', function(){
	it('should return 3', function(done){

		var a = 0;
		var request = superagent;
		jasmine.getEnv().defaultTimeoutInterval = config.netTimeout;

		tas.promise(function(){
			var url = config.res.array;
			request.get(url).end(this.done);
		});

		tas(function(err, data){
			var arr = [1, 2];
			return [arr];
		});

		tas.forEach({
			init: function(element){
				//console.log(element);
			},

			calc: function(){
				a ++; // 2 times.
			}
		});

		tas(function(){
			a ++; // 3
		});

		tas(function(){
			var exp = 3;
			var val = a;
			tester.test('as promise: tas.forEach()', tas, exp, val, true);
			expect(val).toBe(3);
			done();
		});
	});
});
