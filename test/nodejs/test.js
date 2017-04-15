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
// $ node /path/to/tas/examples/nodejs/__tas/test.js

// NOTICE:
// This file loaded multiple JS files at once, and most of them contains async code.
// In the past, these async code will not be executed in the order defined by the code.

// Now with Tas, it's not a problem any more. All tasks (mixing sync tasks and
// async tasks) in these files are executed in the order defined by the code.
//--------------------------------------------

// Disable printing the logs in testing dependencies files.
// Only the test results will be printed.
global.isDisabledLog = true;

var tas = require('../../lib');
var tester = require('../../examples/__lib/tester');
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
			require(file);
		});
	},

	summary: function(){

		// When all tests execution is completed, print summary information.
		tas(function(){
			console.log('# test', total);
			console.log('# pass', tas.count);
			console.log('# fail', total - tas.count);
		})
	}
});
