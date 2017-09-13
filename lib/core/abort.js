/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasks = require('./tasks');
var pass = require('./pass');
var runner = require('./runner');
var flag = require('./flag');

var abort = {
	do: function(msg){
		msg && console.log(msg);

		tasks.clearTheRemainingTasks();
		pass.reset();
		runner.next();

		// Set the flag isAbort for subsequent tasks.
		// Otherwise the subsequent tasks will be executed.
		// When the next "begin" tasks started, it will be restore to false.
		flag.setIsAbort(true);
	}
};

module.exports.__proto__ = abort;
