/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../../lib');
var a  = 0;

// Use tas.await() if the tasks/subtasks contains async code.
tas.await(function(){
	a ++; // 1

	setTimeout(function(){
		a ++; // 2

		// After an asynchronous code execution is complete, you must
		// use tas.next() to let Tas continue with subsequent tasks.
		tas.next();

	}, 500);
});

// This task is executed only if the previous async task execution is completed.
tas(function(){
	a ++; // 3
});

// Another async tasks.
tas.await(function(){
	a ++ ; // 4

	setTimeout(function(){
		a ++; // 5
		tas.next();
	}, 500);
});

// All tasks are performed in the order in which they are written.
tas(function(){
	a ++; // 6
});

// If you do not like split a tasks into several sub-tasks for async task,
// you need to use return "await" in sync tasks.
tas({
	t1: function(){
		a ++; // 7
	},

	t2: function(){
		a ++; // 8

		setTimeout(function(){
			a ++; // 9

			tas.next(); // After the async task execution is completed, continue;
		}, 500);

		return "await"; // Abort Tas, waiting for the async task execution is completed.
	},

	t3: function(){
		a ++; // 10
	}
});

module.exports = {
	get: function(){
		return a; // 10
	}
};
