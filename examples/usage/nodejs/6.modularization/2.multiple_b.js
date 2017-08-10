/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var a  = 2;

tas.await(function(){
	a ++; // 3

	setTimeout(function(){
		a ++; // 4
		tas.next();
	}, 300);
});

tas(function(){
	a ++; // 5
});

module.exports = {
	get: function(){
		return a; // 5
	}
};
