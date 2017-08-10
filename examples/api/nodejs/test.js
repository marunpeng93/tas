/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

//--------------------------------------------
// How to use
//--------------------------------------------
// Do the following in your terminal to run all examples of Tas:
// $ cd /path/to/tas
// $ node examples/api/nodejs/test.js

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
global.isDisabledLog = true;

// Set the repeat times to run all Tas tasks.
// This proves that Tas can run repeatedly and correctly.
var repeatTimes = 0;

var tas = require('../../../lib');
var tester = require('../../__lib/tester');
var runTest = require('../../__lib/runTest');
var requireUncached = require('../../__lib/requireUncached');

var test = function(){
	var files, total;

	tas.count = 0;
	tas({
		initTester: function(){
			tester.init(require('../__res/testFiles').data);
		},

		initFiles: function(){
			files = tester.getFiles({isNoExtName: true});
			total = tester.getNumber(files);
			console.log('Testing 1..%d', total);
		},

		runTests: function(){

			// Load and run the test files.
			files.forEach(function(file){

				// Use requireUncached() instead of require()
				// for repeating run all Tas tasks.
				requireUncached(__dirname + '/' + file);
			});

			// When all tests execution is completed, print summary information.
			tas(function(){
				console.log('# test', total);
				console.log('# pass', tas.count);
				console.log('# fail', total - tas.count);
			})
		}
	});
};

runTest(test, repeatTimes);
