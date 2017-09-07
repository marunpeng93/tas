/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var flag = require('./flag');

var begin = {
	do: function(obj2){
		obj2.isFirst = true;

		// Restore flag iaAbort to false.
		flag.setIsAbort(false);

		return obj2;
	}
};

module.exports = begin;
