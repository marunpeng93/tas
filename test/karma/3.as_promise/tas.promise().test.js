/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('as promise: tas.promise()', function(){
	it('should return an object', function(done){

		var request = superagent;

		tas.promise(function(){
			request.get(config.root + 'examples/__res/pics/a.json').end(this.done);
		});

		tas(function(err, data){
			expect(data instanceof Object).toBe(true);
			done();
		});
	});
});
