
var tas = require('../../lib');
var expect = require('chai').expect;

describe('break the flow: return "break"', function(){
    it('should return 2', function(){

		tas(function(){
			var a = 1;

			tas({
				t1: function(){
					return 'break';
				},

				t2: function(){
					a ++; // skipped
				}
			});

			tas(function(){
				a ++; // 2
			});

			expect(a).to.be.equal(2);
		});
    });
});
