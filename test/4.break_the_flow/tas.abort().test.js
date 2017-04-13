
var tas = require('../../lib');
var expect = require('chai').expect;

describe('break the flow: tas.abort()', function(){
    it('should return 1', function(){

        tas(function(){
            var a = 1;

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

            expect(a).to.be.equal(1);
        });
    });
});
