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
// $ open examples/usage/web_requirejs/test.html

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

require(['src/tas', 'src/tester', '../../__res/testFiles'],
function (tas, tester, testFiles){

	var files, total;

	tas({
		initTester: function(){
			tester.init(testFiles.data);
		},

		initFiles: function(){
			files = tester.getFiles({prefix: 'src', isTestFileOnly: true, isNoExtName: true});
			total = tester.getNumber(files);
			console.log('Testing 1..%d', total);
		},

		setRequireJS: function(){

			// RequireJS cannot guarantees that the first file is loaded
			// before the second file due to the asynchronous nature.

			// We need to use the shim config to define the sequence
			// of files which need to be loaded in correct order.

			// Reference: requirejs order of dependencies
			// http://stackoverflow.com/questions/31868403/requirejs-order-of-dependencies

			requirejs.config({
				shim: tester.getOrder(files)
			});
		},

		runTests: function(){

			// Load and run the test files.
			require(files, function(){

				// When all tests execution is completed, print summary information.
				tas(function(){
					console.log('# test', total);
					console.log('# pass', tas.count);
					console.log('# fail', total - tas.count);
				});
			});
		}
	});
});
