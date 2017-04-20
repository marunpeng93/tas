/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('as promise: this.done', function(){
	it('should return true', function(done){

		var request = superagent;
		jasmine.getEnv().defaultTimeoutInterval = config.netTimeout;

		tas.promise("tas promise", function(){
			var url = config.res[0];
			request.get(url).end(this.done);
		});

		tas(function(err, data){
			var exp = true;
			var val = data instanceof Object;
			tester.test('as promise: this.done', tas, exp, val, true);
			expect(val).toBe(exp);
			done();
		});
	});
});
