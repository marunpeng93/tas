/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var asyncTasks = function(){

	var a = 0;

	tas(function(){

		setTimeout(function(){
			a ++; // 1
			tas.next();
		}, 0);

		// Hang up Tas, waiting for the async task execution is completed.
		return 'await';
	});

// After each function execution is completed, Tas will be hanged up,
// waiting for the async task execution is completed.
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

	tas({
		t1: function (){
			a ++; // 6
		},

		t2: function (){
			setTimeout(function(){
				a ++; // 7
				tas.next();
			}, 0);

			return 'await';
		},

		t3: function (){
			a ++; // 8
		}
	});

	return {
		get: function(){
			return a; // 8
		}
	};

}();
