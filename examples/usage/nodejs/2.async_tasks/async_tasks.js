/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var a = 1;

tas.await({
	t1: function(){
		a ++; // 2

		setTimeout(function(){
			a ++; // 3

			tas.next();
		}, 0);
	},

	t2: function(){
		a ++; // 4

		setTimeout(function(){
			a ++; // 5

			tas.next();
		}, 0);
	}
});

tas(function (){
	a ++; // 6
});

module.exports = {
	get: function(){
		return a; // 6
	}
};
