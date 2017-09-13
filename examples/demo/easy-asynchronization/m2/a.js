/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var log = tas.tree.log;

tas.await({
	t12: function(){
		a ++; // 12

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 13

			log('t13');
			log('continue...');

			tas.next();
		}, 500);
	}
});

tas(function t14(){
	a ++; // 14
	tas.next();
});

