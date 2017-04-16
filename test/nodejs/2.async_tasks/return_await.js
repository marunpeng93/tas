/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var a = 1;

tas({
	t1: function(){
		a ++; // 2
	},

	t2: function(){
		a ++; // 3

		setTimeout(function(){
			a ++; // 4

			tas.next();
		}, 500);

		return "await";
	},

	t3: function(){
		a ++; // 5
	}
});

module.exports = {
	get: function(){
		return a; // 5
	}
};
