/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

//--------------------------------------------
// How to use
//--------------------------------------------
// Do the following in your terminal to run this file to test all examples of Tas:
// $ open /path/to/tas/examples/web/__tas/test.html

// NOTICE:
// This file loaded multiple JS files at once, and most of them contains async code.
// In the past, these async code will not be executed in the order defined by the code.

// Now with Tas, it's not a problem any more. All tasks (mixing sync tasks and
// async tasks) in these files are executed in the order defined by the code.
//--------------------------------------------

// Disable printing the logs in testing dependencies files.
// Only the test results will be printed.
global = {isDisabledLog: true};

(function test(){
	var files, total;

	tas({
		initTester: function(){
			tester.init(testFiles.data);
		},

		initFiles: function(){
			files = tester.getFiles({prefix: 'js/examples'});
			total = tester.getNumber(files);
			console.log('Testing 1..%d', total);
		},

		runTests: function(){

			// Load and run the test files.
			load(files, function(){

				// When all tests execution is completed, print summary information.
				tas(function(){
					console.log('# test', total);
					console.log('# pass', tas.count);
					console.log('# fail', total - tas.count);
				});
			});
		}
	});

})();
