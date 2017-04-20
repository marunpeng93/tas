/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var a = 1;

tas(function(){
		a ++; // 2
	},

	function(){
		a ++; // 3
	}
);

module.exports = {
	get: function(){
		return a; // 3
	}
};
