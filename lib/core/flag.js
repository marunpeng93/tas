/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = require('./data');

var flag = {
	isAbort: function(){
		return data.flag.isAbort;
	},

	setIsAbort: function(val){
		data.flag.isAbort = val;
	},

	setIsAwait: function(val){
		data.flag.isAwait = val;
	},

	setHasAsync: function(val){
		data.flag.hasAsync = val;
	}
};

module.exports.__proto__ = flag;
