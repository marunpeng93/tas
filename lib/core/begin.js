/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var flag = require('./flag');

var begin = {
	f: false,

	do: function(obj){
		this.f = false;
		obj.isFirst = true;

		// Restore flag iaAbort to false.
		flag.setIsAbort(false);

		return obj;
	},

	is: function(){
		return this.f;
	},

	set: function(){
		this.f = true;
	}
};

module.exports = begin;
