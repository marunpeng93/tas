/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var log = tas.tree.log;

tas({
	t2: function(){
		a ++; // 2

		require('./a');

		return 'await';
	},

	t8: function(){
		a ++; // 8

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 9

			log('t9');
			log('continue...');

			tas.next();
		}, 500);

		return 'await';
	},

	t10: function(){
		a ++; // 10
	}
});
