/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = require('./data');
var runner = require('./runner');
var units = require('./units');
var flag = require('./flag');

var tasks = {
	add: function(obj){
		var d = data;
		var flag = d.flag;
		var type = typeof obj;

		// A function
		if (type === 'function' && !d.layer && !flag.isAwait) {
			runner.execFunc(obj);
		}
		else {
			// An object (a set of functions)
			type === 'object' && !obj.isTheLastFunctionMarked && (this.markTheLastFunction(obj));
			this.addToLayer(obj);
			!flag.isAwait && units.do(d.tasks[d.layer].shift());
		}
	},

	addToLayer: function(obj){
		var d = data;
		var layer = d.layer;
		var tasks = d.tasks;

		obj.layer = layer;

		typeof tasks[layer] === 'undefined' && (tasks[layer] = []);
		tasks[layer].push(obj);
	},

	markTheLastFunction: function(task){
		var keys = Object.keys(task);
		var func;

		for (var i = keys.length - 1; i >= 0; i --) {
			func = task[keys[i]];
			if (typeof func === 'function') {
				break;
			}
		}

		func.isTheLastFunc = true;
		task.isTheLastFunctionMarked = true;
	},

	clearTheRemainingTasks: function(){
		var d = data;
		var maxLayer = d.maxLayer;
		var arrTasks;
		var lay;

		// clear the remaining functions in this tasks
		for (lay = maxLayer; lay >= 0; lay --) {
			d.units[lay] && (d.units[lay].length = 0);
		}

		// clear the sub tasks in this tasks
		for (lay = maxLayer; lay > 0; lay --) {
			d.tasks[lay] && (d.tasks[lay].length = 0);
		}

		// clear the remaining tasks in this line
		arrTasks = d.tasks[0];
		while (arrTasks && arrTasks.length) {
			if (arrTasks[0].isFirst) {
				break;
			}
			arrTasks.shift();
		}
	}
};

module.exports.__proto__ = tasks;
