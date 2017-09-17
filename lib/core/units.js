/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = require('./data');
var runner = require('./runner');

var Tas;
var currentTask = {};

var units = {
	do: function(task){
		this.add(task);

		var queue = data.units[task.layer];
		queue && queue.length && runner.exec(queue);
	},

	add: function(task){
		var d = data;
		var layer = task.layer || 0;

		currentTask.layer = layer;
		currentTask.root = task;

		typeof d.units[layer] === 'undefined' && (d.units[layer] = []);

		var arr = d.units[layer];
		var isTreeEnabled = data.extensions.isTreeEnabled;
		isTreeEnabled && Tas.tree.nested.createFnForBegin(arr);

		var t = task;
		if (typeof task === 'function') {
			var o = {};
			o[task.name] = task;
			o.isAwait = task.isAwait;
			t = o;
		}
		this.getAllFunctions(layer, t, t, t.isAwait, arr, 0);

		isTreeEnabled && Tas.tree.nested.createFnForEnd(arr);
	},

	getAllFunctions: function getAllFunctions(layer, root, obj, isAwait, arr, deep) {
		var key;
		var func;
		var keys = Object.keys(obj);
		var isTreeEnabled = data.extensions.isTreeEnabled;

		for (var i = 0, len = keys.length; i< len; i ++) {
			key = keys[i];
			func = obj[key];

			if (typeof func === 'object') {
				isTreeEnabled && Tas.tree.nested.createFnForAdd(key, arr, deep);
				getAllFunctions(layer, root, func, isAwait, arr, deep + 1);
				isTreeEnabled && Tas.tree.nested.createFnForSub(arr, deep);
			}
			else
			if (typeof func === 'function') {
				func.root = root;
				func.layer = layer;
				func.isAwait = isAwait;
				arr.push(func);

				isTreeEnabled && (func.treeBranch = key);
				isTreeEnabled && (func.treeIndent = Tas.tree.nested.getCount() + deep);
			}
		}
	},

	clearTheRemainingFunctions: function(){
		var d = data;
		var layer = currentTask.layer;
		var root = currentTask.root;
		var functions = d.units[layer];

		for (var i = 0, len = functions.length; i < len; i ++) {

			/* istanbul ignore else */
			if (functions[i] && functions[i].root === root) {
				functions.shift();
			}
		}
	},

	saveTas: function(Tas_){
		Tas = Tas_;
	}
};

module.exports.__proto__ = units;
