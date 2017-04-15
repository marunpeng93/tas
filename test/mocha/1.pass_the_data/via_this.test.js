/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var expect = require('chai').expect;

describe('pass the data: via this', function(){
    it('should return 5', function(){

        var a = 1;

        tas({
            t1: function(){
                this.a = 1;
            },

            t2: {
                t3: function(){
                    this.a ++; // 2
                },

                t4: function(){
                    [1].forEach(function(){
                        this.a ++; // 3
                    }.bind(this)); // bind this, important!

                    this.a ++; // 4
                }
            },

            t5: function(){
				this.a ++; // 5
                a = this.a;
            }
        });

        expect(tas.a).to.be.equal(5);
    });
});
