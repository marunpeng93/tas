/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

describe('as promise: tas.all()', function(){
	it('should return an array', function(done){

		var request = superagent;

		tas.all({
			t1: function(){
				request.get(config.root + 'examples/__res/pics/a.json').end(this.done);
			},

			t2: function(){
				request.get(config.root + 'examples/__res/pics/b.json').end(this.done);
			},

			t3: function(){
				request.get(config.root + 'examples/__res/pics/c.json').end(this.done);
			}
		});

		tas(function(err, data){
			expect(data instanceof Array).toBe(true);
			done();
		});
	});
});
