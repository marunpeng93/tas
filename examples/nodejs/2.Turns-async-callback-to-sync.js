/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../../lib'),
	require('../utils').title,
	require('../utils').log,
	require('../utils').logs,
	require('../utils').tree
)})

(function (tas, title, log, logs, tree) {

	tas(function(){
		title('2. Turns async callback to sync');
	});

	// Simulate an ajax object
	var ajax = {
		get: function (url, callback) {
			var args, times;

			log('Ajax get url %s.', url);

			// Simulate data.
			times = this.times = typeof this.times === 'undefined' ? 0 : this.times + 1;
			args = [4, 5, 6].map(function(v){return v + times * 3});

			// Simulate time-consuming operation.
			setTimeout(function(){

				// Execute the callback function and pass the arguments to it.
				log('Do callback with arguments %s.', args.join(', '));
				callback.apply(null, args);

			}, 1000);
		}
	};

	//--------------------------------------------
	// 1. Use tas.await()
	//--------------------------------------------

	tas.await({
		t1: function () {
			log('Wait 1 second...');

			setTimeout(function(){
				log('Pass 1, 2, 3 to next function.');

				// After an asynchronous code execution is complete, you must
				// use tas.next() to let Tas continue with subsequent tasks.
				tas.next(1, 2, 3);

			}, 1000);
		},

		t2: function (a, b, c) {
			log('Receive %s, %s, %s from the previous function.', a, b, c); // 1 2 3
			log();

			ajax.get('http://github.com/hiowenluke/tas/examples', function (a, b, c) {
				log('Receive %s, %s, %s from Ajax.get().', a, b, c);
				log();
				log('Pass %s, %s, %s to the next function.', a, b, c);
				tas.next(a, b, c);
			});
		},

		t3: function (a, b, c) {
			log('Receive %s, %s, %s from the previous function.', a, b, c); // 4 5 6
			log();

			// You can use tas.next() directly as a callback function.
			ajax.get('http://github.com/hiowenluke/tas/examples', tas.next);
		},

		t4: function(a, b, c){
			log('Receive %s, %s, %s from the previous function.', a, b, c); // 7 8 9
			log();
			tas.next();
		}
	});


	//--------------------------------------------
	// 2. Mix async tasks and sync tasks
	//--------------------------------------------

	tas(function(data){
		log("This task is executed only if the previous");
		log("asynchronous task is completed.");
		log("So cool!");
		log();
	});

	tas.await(function(){
		log('Wait 1 second...');
		setTimeout(function(){
			tas.next();
		}, 1000);
	});

	tas(function(){
		log('Done\n');
	});


	//--------------------------------------------
	// 3. A crazy example of Tas
	//--------------------------------------------

	// See "8.How-powerful-Tas-is.js".

});