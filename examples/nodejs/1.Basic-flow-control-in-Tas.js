/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../../lib'),
	require('../util').title,
	require('../util').log,
	require('../util').logs,
	require('../util').tree
)})

(function (tas, title, log, logs, tree) {

	tas(function(){
		title('1. Basic flow control in Tas');
	});

	//--------------------------------------------
	// Introduce
	//--------------------------------------------

	// Tas executes all functions of the tasks object one by one in a synchronized
	// manner, even if the function contains asynchronous code, such as
	// setTimeout, ajax, XMLHttpRequest, fs.readFile, etc.


	//--------------------------------------------
	// 1. A Simple Example
	//--------------------------------------------

	tas("My first tasks", {
		t1: function () {
			// Do something.
		},

		t2: function(){
			// Do something.
		}
	});

	// You can use this in a simplified way if the task object
	// only contains functions, and no child objects.
	tas(
		function t1(){
			// Do something.
		},

		function t2(){
			// Do something.
		}
	);


	//--------------------------------------------
	// 2. Pass the data to the next function
	//--------------------------------------------

	tas("Pass the data to the next function", {
		name: "tasks1",

		t1: function () {
			log("Pass 1, 2, 3 to the next function.");

			// Pass the data to the next function.
			// The next function can be one of the following:
			// 		1. the next function of the current function.
			// 		2. the first function of the next child object.
			// 		3. the first function of the next tasks object (In this case, it's tasks2).
			return [1, 2, 3];
		},

		// All functions of t2, including sub-object functions will be executed.
		t2: {
			t1: function (a, b, c) {
				log("Receive %d, %d, %d from the previous function.", a, b, c); // 1 2 3
				log();
				log("Pass 4, 5, 6 to the next function.");
				return [4, 5, 6];
			},

			t2: function(a, b, c){
				log(a, b, c); // 4 5 6
				return [7, 8, 9];
			}
		}
	});


	//--------------------------------------------
	// 3. Pass the data through "this"
	//--------------------------------------------

	tas("Pass the data through \"this\"", {
		name: "tasks2",

		t1: function (a, b, c) {
			log(a, b, c); // 7 8 9
			log();

			// In Tas, the "this" refers to the current tasks object (tasks2).
			log("Set this.foo to 'bar'.");
			this.foo = "bar";
		},

		t2: {
			t1: {
				t1: function () {
					// Get the value of this.foo, which will be "bar".
					log("Get this.foo, it is '%s', correct!", this.foo);
				},

				t2: function () {
					log();
				}
			},

			t2: function(){
				[1].forEach(function(){

					// Get the value of this.foo, which will be "bar".
					log("In forEach(..), get this.foo, it is '%s', correct!", this.foo);

					this.foo = 2017;
					log("In forEach(..), change the value of this.foo to %s.", this.foo);

					// Binding "this" is the key to this magic, because the
					// current tasks object (tasks2) has been bound to "this".
				}.bind(this));

				log("this.foo = %s, correct!", this.foo);
			}
		},

		t3: function(){
			log();
		}
	});

	//--------------------------------------------
	// 4. Pass the data through Tas
	//--------------------------------------------

	tas("Pass the data through Tas", {
		t1: function () {

			log('Attach data to Tas for other tasks and modules.');
			log('For example, save string "Error: The username is undefined" to tas.err.');
			log();

			if (typeof username === 'undefined') {
				tas.err = "Error: The username is undefined";

				log('The tas.err has no special meaning, "err" is just a general property.')
				log(tas.err);
				log();
			}
		},

		t2: {
			t1: {
				t1: function(){
					log('Handle tas.err.');
					if (tas.err) {
						log(tas.err);
						log();
					}
				}
			}
		}
	});

	tas({
		t1: function(){
			log('Handle tas.err in the other tasks.');
			if (tas.err) {
				log(tas.err);
				log();
			}
		},

		t2: function(){
			// Do something.
		}
	});


	//--------------------------------------------
	// 5. Ignore the current function
	//--------------------------------------------

	tas({
		t1: function () {

			// Put the return statement on top of the function to ignore it.
			return;

			// The following statement(s) will not be executed.
			log('Do something.');
		}
	});


	//--------------------------------------------
	// 6. Break the current tasks
	//--------------------------------------------

	tas({
		init: function(){
			if (typeof filename === 'undefined') {
				logs(
					'The current task was broken,',
					'The following functions will be skipped:',
					'  readFile()',
					'  setText()',
					'  writeFile()',
					''
				);

				// Use return "break" or return false to break the current tasks.
				return "break"; // return false;
			}
		},

		readFile: function(){
			log('readFile():  Read file...');
		},

		setText: function(){
			log('setText():   Set the file content...');
		},

		writeFile: function(){
			log('writeFile(): Write to the file...');
			log();
		}
	});


	//--------------------------------------------
	// 7. Break Tas
	//--------------------------------------------

	tas({
		t1: function () {

			// Change the value of x to 0 or 1 to see the different result.
			var x = 10;

			if (x === 10) {
				log('Return "break!" or use tas.break() to abort Tas.');
				log('The subsequent functions and tasks will not be executed.');
				log();
			}

			if (x === 0) {
				log('Return "break!" to abort Tas.');
				log('The subsequent functions and tasks will not be executed.');
				log();
				return "break!";
			}

			if (x === 1) {
				[1].forEach(function(){
					log('Use tas.break() to abort Tas in nested function.');
					log('The subsequent functions and tasks will not be executed.');
					log();
					tas.break();
				});
			}
		},

		t2: function () {
			log('Do something.');
		}
	});

	tas(function(){
		log('Done\n');
	});
});