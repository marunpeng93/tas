/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('3.as promise: tas.cancel()', function(){
	it('should return true', function(done){

		var request = superagent;
		var handlers = [];
		jasmine.getEnv().defaultTimeoutInterval = config.netTimeout;

		tas.race({
			t1: function(){
				var url = config.res.a;
				handlers.push(request.get(url).end(this.done));
			},

			t2: function(){
				var url = config.res.b;
				handlers.push(request.get(url).end(this.done));
			},

			t3: function(){
				var url = config.res.c;
				handlers.push(request.get(url).end(this.done));
			}
		});

		tas(function(err, data){
			tas.cancel(handlers);

			var exp = true;
			var val = data instanceof Object;
			tester.test('3.as promise: tas.cancel()', tas, exp, val, true);
			expect(val).toBe(exp);
			done();
		});
	});
});
