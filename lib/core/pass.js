/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = require('./data');

var pass = {
	save: function(result){
		var len = result.length;
		len === 2 ? this.save2(result[0], result[1]) :
		len === 1 ? this.save1(result[0]) :
		len === 0 ? this.save0() :
		this.saveArray(result);
	},

	save0: function(){
		var d = data;
		d.pass[0] = undefined;
		d.pass[1] = undefined;
		d.pass.isHasArgs = false;
	},

	save1: function(data_){
		var d = data;
		d.pass[0] = data_;
		d.pass[1] = undefined;
		d.pass.isHasArgs = true;
	},

	save2: function(a0, a1){
		var d = data;
		d.pass[0] = a0;
		d.pass[1] = a1;
		d.pass.isHasArgs = true;
	},

	saveArray: function(arr){
		var d = data;
		d.pass = arr;
		d.pass.isHasArgs = true;
	},

	reset: function(){
		data.pass.length = 0;
		data.pass.isHasArgs = false;
	}
};

module.exports.__proto__ = pass;
