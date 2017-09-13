/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var log = tas.tree.log;

tas.await({
	t11: function(){
		a ++; // 11

		require('./a');
		require('./b');
	},

	t18: function(){
		a ++; // 18

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 19

			log('t19');
			log('continue...');

			tas.next();
		}, 500);
	}
});
