/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// The utils is only used for this example, not part of Tas.
define(['../../../../dist/tas.min', '../../../../examples/utils'], function(tas, utils){
	var title = utils.title, log = utils.log, logs = utils.logs, tree = utils.tree;

	tas(function(){
		title('3. Understand the order of Tas tasks');
	});

	// The tas.await() and tas() in this indent level is not part of 
	// this example. Use it to distinguish multiple examples.
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

		var a = 1;

		tas.await("start", function(){
			log('Wait 1 second...');

			setTimeout(function whenTimesUp(){
				a ++;
				tas.next();
			}, 1000);
		});

		a = 2;

		tas("end", function(){
			log(a); // It's 3, not 2.
			log();
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

		var a = 4;

		tas.await("start", function () {
			log('Wait 1 second...');

			setTimeout(function whenTimesUp(){
				a ++;
				tas.next();
			}, 1000);
		});

		tas("doIt", function(){
			a = 6;
		});

		tas("end", function(){
			log(a); // 6
			log();
		});
	});


	tas.await(function(){

		//--------------------------------------------
		// 3. The simplified way
		//--------------------------------------------

		var a = 7;

		tas.await(function () {
			log('Wait 1 second...');

			setTimeout(function(){
				a ++;
				tas.next();
			}, 1000);
		});

		tas(function(){
			a = 9;
		});

		tas(function(){
			log(a); // 9
			log();
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
		// 5. Split the code into multiple Tas tasks
		//--------------------------------------------

		// Split the code into a set of small tasks. This way, when you want to insert 
		// a new task, you do not have to heavily adjust the original code structure.

		// For example, if you want to insert an asynchronous task to get data 
		// from the server, you just need to use Tas.await() to contain the 
		// necessary async code, and put the other code into Tas().
	});


	tas(function(){

		//--------------------------------------------
		// 6. Put all the logic code into Tas
		//--------------------------------------------

		// Consider the following common situation:

		// Loading multiple JS files at the same time, and each JS file contains async code.
		// Those async code will not be executed in the order defined by the code.
		// Now with Tas, this problem will be solved easily.

		// Read the index.js file again. It loaded multiple JS files at once.
		// All Tas tasks (mixing the sync tasks and the async tasks)
		// are executed in the order defined by the code.

		// It is recommended that you put all the logic code into Tas.
	});
});