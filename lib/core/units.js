/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = require('./data');
var runner = require('./runner');

var units = {
	do: function(task){
		this.add(task);

		var queue = data.units[task.layer];
		queue && queue.length && runner.exec(queue, true);
	},

	add: function(task){
		var d = data;
		var layer = task.layer || 0;

		d.currentTask.layer = layer;
		d.currentTask.root = task;

		typeof d.units[layer] === 'undefined' && (d.units[layer] = []);
		this.getAllFunctions(layer, task, task, task.isAwait, d.units[layer]);
	},

	getAllFunctions: function getAllFunctions(layer, root, obj, isAwait, arr) {
		var key;
		var func;
		var keys = Object.keys(obj);
		var isLogTreeEnabled = data.extensions.isLogTreeEnabled;

		for (var i = 0, len = keys.length; i< len; i ++) {
			key = keys[i];
			func = obj[key];

			if (typeof func === 'object') {
				getAllFunctions(layer, root, func, isAwait, arr);
			}
			else
			if (typeof func === 'function') {
				func.root = root;
				func.layer = layer;
				func.isAwait = isAwait;
				isLogTreeEnabled && !func.name && /* istanbul ignore next */ (func.name = key);
				arr.push(func);
			}
		}
	},

	clearTheRemainingFunctions: function(){
		var d = data;
		var layer = d.currentTask.layer;
		var root = d.currentTask.root;
		var functions = d.units[layer];

		for (var i = 0, len = functions.length; i < len; i ++) {

			/* istanbul ignore else */
			if (functions[i].root === root) {
				functions.shift();
			}
		}
	}
};

module.exports.__proto__ = units;
