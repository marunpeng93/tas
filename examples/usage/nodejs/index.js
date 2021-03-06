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
// $ cd /path/to/tas
// $ node examples/usage/nodejs/index.js

//--------------------------------------------
// NOTICE
//--------------------------------------------
// This file load multiple JS files at once, and most of them contains async code.
// In the past, these async code will not be executed in the order we write.

// Now with Tas, it's not a problem any more. All tasks (mixing sync tasks and
// async tasks) in these files are executed in the order we write.
// And, after that, the summary information will be printed.
//--------------------------------------------

// Disable printing the logs in testing dependencies files.
// Only the test results will be printed.
isDisabledLog = true;

// Set the repeat times to run all Tas tasks.
// This proves that Tas can run repeatedly and correctly.
var repeatTimes = 0;

var tas = require('./tas');
var tester = require('./tester');

var runTest = require('../../__lib/runTest');
var requireUncached = require('../../__lib/requireUncached');

var test = function(){
	var files, total;

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

runTest.do(test, repeatTimes);
