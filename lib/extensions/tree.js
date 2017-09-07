/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var Tas;
var data = require('../core/data');
var runner = require('../core/runner');

var isShowLogTree = true;
var tree = {
	init: function (Tas_){
		Tas = Tas_;
		runner.saveTas(Tas);

		Tas.logTree = this.logTree;
		Tas.enableLogTree = this.setIsEnabled;
		Tas.setIsShowLogTree = this.setIsShowLogTree;
	},

	setIsEnabled: function(val){
		data.extensions.isLogTreeEnabled = val;
	},

	setIsShowLogTree: function(val){
		isShowLogTree = val;
	},

	logTree: function(str){
		if (!data.extensions.isLogTreeEnabled) return;

		var layer = data.layer + 1;
		var maxLayer = data.maxLayer + 1;

		var lay = data.flag.isAwait ? maxLayer + 1 : layer;
		var indent = util.repeat(' ', (lay - 1) * 4);
		util.log(('  ' + lay).substr(-2) + '| ' + indent + str);
	}
};

var util = {
	log: function(){
		var args = [].slice.call(arguments);
		isShowLogTree && /* istanbul ignore next */ console.log.apply(console, args);
	},

	repeat: function (str, times) {
		return new Array(times + 1).join(str);
	}
};

module.exports.__proto__ = tree;
