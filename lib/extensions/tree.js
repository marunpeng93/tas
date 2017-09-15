/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var Tas;
var data = require('../core/data');
var runner = require('../core/runner');
var units = require('../core/units');

var nested = {
	count: 0,

	add: function(){
		nested.count ++;
	},

	sub: function(){
		nested.count --;
	},

	getCount: function(){
		return nested.count;
	},

	createFnForBegin: function(arr){
		var fn = function(){
			nested.add();
		};
		fn.__isIgnore = true;
		arr.push(fn);
	},

	createFnForEnd: function(arr){
		var fn = function(){
			nested.sub();
		};
		fn.__isIgnore = true;
		arr.push(fn);
	},

	createFnForAdd: function(fnName, arr, deep){
		var fn = function(){
			nested.add();
		};

		fn.treeIndent = nested.getCount() + deep;
		fn.__isIgnore = true;
		fn.__realName = fnName;
		arr.push(fn);
	},

	createFnForSub: function(arr, deep){
		var fn = function(){
			!data.flag.isAwait && nested.sub();
		};

		fn.treeIndent = nested.getCount() + deep;
		fn.__isIgnore = true;
		arr.push(fn);
	}
};

var indent = {
	lastTreeIndent: 0,

	getStr: function(i){
		var level = indent.lastTreeIndent + 1 + (typeof i === 'undefined' ? 0 : i);
		var indentStr = util.repeat(' ', (level - 1) * 4);
		var prefix = ('  ' + level).substr(-2) + '|';
		return prefix + indentStr;
	}
};

var logArray = {
	data: [],
	isSaveToArr: false,

	begin: function(){
		logArray.isSaveToArr = true;
		logArray.data.length = 0;
	},

	save: function(str){
		logArray.data.push(str);
	},

	getStr: function(){
		return logArray.data.join('\n');
	}
};

var tree = {
	init: function (Tas_){
		Tas = Tas_;
		runner.saveTas(Tas);
		units.saveTas(Tas);

		Tas.tree = this;
		Tas.tree.logArray = logArray;
		Tas.tree.nested = nested;

		data.extensions.isTreeEnabled = true;
	},

	unload: function(){
		data.extensions.isTreeEnabled = false;
	},

	print: function(func){
		var funcName = func.__isIgnore ? func.__realName : func.name;
		if (!funcName) return;

		typeof func.treeIndent !== 'undefined' && (indent.lastTreeIndent = func.treeIndent);

		var indentStr = indent.getStr();
		util.log(indentStr, funcName);
	},

	log: function(){
		if (!data.extensions.isTreeEnabled) return;

		var args = [].slice.call(arguments);
		var indentStr = indent.getStr(+1);

		args.unshift(indentStr);
		util.log.apply(null, args);
	}
};

var util = {
	log: function(){
		var args = [].slice.call(arguments);

		/* istanbul ignore else */
		if (logArray.isSaveToArr) {
			logArray.save(args[0] + ' ' + args[1]);
		}
		else {
			!global.isDisabledLog && console.log.apply(console, args);
		}
	},

	repeat: function (str, times) {
		return new Array(times + 1).join(str);
	}
};

module.exports.__proto__ = tree;
