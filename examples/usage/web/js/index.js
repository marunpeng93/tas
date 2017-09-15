/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

//--------------------------------------------
// How to use
//--------------------------------------------
// Do the following in your browser to run all examples of Tas:
// $ cd /path/to/tas
// $ open examples/usage/web/test.html

//--------------------------------------------
// NOTICE
//--------------------------------------------
// This file load multiple JS files at once, and most of them contains async code.
// In the past, these async code will not be executed in the order defined by the code.

// Now with Tas, it's not a problem any more. All tasks (mixing sync tasks and
// async tasks) in these files are executed in the order defined by the code.
// And, after that, the summary information will be printed.
//--------------------------------------------

// Disable printing the logs in testing dependencies files.
// Only the test results will be printed.
global = {isDisabledLog: true};

// Set the repeat times to run all Tas tasks.
// This proves that Tas can run repeatedly and correctly.
var repeatTimes = 0;

var test = function (){
	var files, total;

	tas.count = 0;
	tas({
		initTester: function(){
			tester.init(testFiles.data);
		},

		initFiles: function(){
			files = tester.getFiles({prefix: 'js/src'});
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
};

runTest.do(test, repeatTimes);

