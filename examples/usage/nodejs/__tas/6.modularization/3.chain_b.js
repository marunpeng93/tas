/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../../lib');
var ma = require('./3.chain_a.js');
var a;

tas.await(function(){
	a = 2 + ma.get(); // 5

	setTimeout(function(){
		a ++; // 6
		tas.next();
	}, 300);
});

tas(function(){
	a ++; // 7
});

module.exports = {
	get: function(){
		return a; // 7
	}
};
