/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// CAUTION:
// Tas has only one global object. When multiple modules use
// tas.abc to pass data, the value of tas.abc is determined
// by the last executed module (e.g., an async module).

var tas = require('../../../../lib');
tas(function(){

    tas.a = 1;

    tas({
        t1: function(){
            tas.a ++; // 2
        },

        t2: {
            t3: function(){
                tas.a ++; // 3
            },

            t4: function(){
                [1].forEach(function(){
                    tas.a ++; // 4
                });
                
                tas.a ++; // 5
            }
        },

        t5: function(){
            tas.a ++; // 6
        }
    });

    tas(function(){
        tas.a ++; // 7
    });
});

module.exports = {
	get: function(){
		return tas.a; // 7
	}
};
