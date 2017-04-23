/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('as promise: tas.all()', function(){
	it('should return true', function(done){

		var request = superagent;
		jasmine.getEnv().defaultTimeoutInterval = config.netTimeout;

		tas.all({
			t1: function(){
				var url = config.res.a;
				request.get(url).end(this.done);
			},

			t2: function(){
				var url = config.res.b;
				request.get(url).end(this.done);
			},

			t3: function(){
				var url = config.res.c;
				request.get(url).end(this.done);
			}
		});

		tas(function(err, data){
			var exp = true;
			var val = data instanceof Array;
			tester.test('as promise: tas.all()', tas, exp, val, true);
			expect(val).toBe(exp);
			done();
		});
	});
});
