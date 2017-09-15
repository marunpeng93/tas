/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../util'],
function(tas, util){

	var log = util.log;
	var a;

	// The tas.await() and tas() in the first indent level is not part of
	// this example, just use it to separate multiple examples.
	tas.await(function(){

		//--------------------------------------------
		// 1. The wrong way
		//--------------------------------------------
		// The order of execution of the following code is:
		//   a = 1
		//   start()
		//   a = 2
		//   whenTimesUp()
		//   end()

		// When whenTimesUp() is called, the initial value of a is 2 (not 1).
		// So the final value of a is 3, rather than the expected 2.
		//--------------------------------------------

		a = 1;

		tas.await(function start(){
			setTimeout(function whenTimesUp(){
				a ++; // 3
				tas.next();
			}, 500);
		});

		a = 2;

		tas(function end(){
			log(a); // It's 3, not 2.
		})
	});


	tas.await(function(){

		//--------------------------------------------
		// 2. The right way
		//--------------------------------------------
		// Put the statement a = 2 into the task doIt(),
		// this ensures the correct execution order:
		//   start()
		//   whenTimesUp()
		//   doIt()
		//   end()
		//--------------------------------------------

		a = 4;

		tas.await(function start() {
			setTimeout(function whenTimesUp(){
				a ++; // 5
				tas.next();
			}, 500);
		});

		tas(function doIt(){
			a = 6;
		});

		tas(function end(){
			log(a); // 6
		});
	});


	tas.await(function(){

		//--------------------------------------------
		// 3. The simplified way
		//--------------------------------------------

		a = 7;

		tas.await(function () {
			setTimeout(function(){
				a ++; // 8
				tas.next();
			}, 500);
		});

		tas(function(){
			a = 9;
		});

		tas(function(){
			log(a); // 9
		});
	});


	tas(function(){

		//--------------------------------------------
		// 4. Use tas.await() if the subtask contains async code
		//--------------------------------------------

		// Look at the above code. We will find that as long as the subtask contains
		// asynchronous code, then the parent task (and the ancesor task)
		// MUST USE tas.await() instead of tas(). That's important!
	});


	tas(function(){

		//--------------------------------------------
		// 5. Split the code logic into a set of mini-tasks
		//--------------------------------------------

		// Always split the code logic into a set of mini-tasks. When you want to insert
		// a new task, you do not have to heavily adjust the original code structure.

		// For example, if you want to insert an asynchronous task to get data
		// from the server, you just need to use tas.await() to contain the
		// necessary async code, and put other code into tas().
	});

	return {
		get: function(){
			return a; // 9
		}
	};
});