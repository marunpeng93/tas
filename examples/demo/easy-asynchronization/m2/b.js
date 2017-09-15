/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var log = tas.tree.log;

tas({
	t15: function(){
		a ++; // 15

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 16

			log('t16');
			log('continue...');

			tas.next();
		}, 500);

		return 'await';
	},

	t17: function(){
		a ++; // 17
		tas.next();
	}
});
