/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var mb = require('./2.chain_b');
var a = 4 + mb.get(); // 12

tas.await(function(){
	a ++; // 13

	setTimeout(function(){
		a ++; // 14
		tas.next();
	}, 500);
});

tas(function(){
	a ++; // 15
})

module.exports = {
    get: function(){
        return a; // 15
    }
};
