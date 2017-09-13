/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// load Tas with tree for demonstrating.
// this will makes Tas in all modules loading tree automatically.
var tas = require('../../../lib').load('tree');
var log = tas.tree.log;

// enable tree
tas.tree.enable();

// define a as global variable
a = 0;

tas.await({
	t1: function(){
		a ++; // 1

		require('./m1');
		require('./m2');

		tas(function t20(){
			a ++; // 20

			log('wait 0.5 seconds...');
			setTimeout(function(){
				a ++; // 21

				log('t21');
				log('continue...');

				tas.next();
			}, 500);

			return "await";
		});

		tas(function t22(){
			a ++; // 22
			tas.next();
		})
	},

	t23: function(){
		a ++; // 23
		tas.next();
	}
});

tas(function end(){
	console.log('a =', a);
});
