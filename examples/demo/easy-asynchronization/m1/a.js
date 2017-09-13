/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib').load('tree');
var log = tas.tree.log;

tas.await({
	t3: function(){
		a ++; // 3

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 4

			log('t4');
			log('continue...');

			tas.next();
		}, 500);
	},

	t5: function t5(){
		a ++; // 5

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 6

			log('t6');
			log('continue...');

			tas.next();
		}, 500);
	}
});

tas(function t7(){
	a ++; // 7
});
