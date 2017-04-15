/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('break the flow: tas.break()', function(){
    it('should return 1', function(){

        tas(function(){
            var a = 1;

            tas({
                t1: function(){
                    [1].forEach(function(){
                        tas.break();
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
