/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// Load Tas with tree for this demonstrating.
// This will makes Tas in all modules loading tree automatically.
// So in other modules, we do not have to do load('tree') repeatedly.
var tas = require('./tas').load('tree');

// Print the tree logs.
var log = tas.tree.log;

// define a as global variable for testing
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
