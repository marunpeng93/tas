/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = require('./data');
var tasks = require('./tasks');
var units = require('./units');
var pass = require('./pass');
var flag = require('./flag');
var abort = require('./abort');
var break_ = require('./break');

var Tas;
var forEach;

var runner = {
	exec: function(queue, isWithLayer){
		var flag = data.flag;

		/* istanbul ignore next */
		if (flag.isAwait) return;

		var func;
		var result;
		var run = runner[isWithLayer ? 'runFuncWithLayer' : 'runFunc'];

		while(func = queue.shift()) {
			result = run(func);

			if (flag.isAwait) {
				break;
			}

			if (result === 'await' || func.isAwait === true) {
				flag.isAwait = true;
				break;
			}
		}
	},

	execFunc: function(func){
		var flag = data.flag;

		/* istanbul ignore next */
		if (flag.isAwait) return;

		var result = runner.runFuncWithLayer(func);
		if (result === 'await' || func.isAwait === true) {
			flag.isAwait = true;
		}
	},

	runFuncWithLayer: function(func){
		data.extensions.isLogTreeEnabled && Tas.logTree(func.name);

		data.maxLayer = data.layer;
		data.layer ++;

		var result = runner.runFunc(func, true);
		data.layer > 0 && data.layer --;

		return result;
	},

	runFunc: function(func, isPrintedLogTree){
		var isForEachEnabled = data.extensions.isForEachEnabled;
		var isLogTreeEnabled = data.extensions.isLogTreeEnabled;

		!isPrintedLogTree && isLogTreeEnabled && Tas.logTree(func.name);

		var args = data.pass;
		var result = args.isHasArgs ? func.apply(null, args) : func();

		if (isForEachEnabled && func.isTheLastFunc && func.root.isForEach) {
			forEach.loop();
		}
		else {
			result === undefined ? pass.save0() :
				Array.isArray(result) ? pass.save(result) :
					result === 'break' ? break_.do() :
						result === 'abort' ? abort.do() :
							result === 'continue' ? forEach.continue() :
								pass.save1(result);

			return result;
		}
	},

	next: function(){
		var d = data;
		var f = d.flag;
		var isForEachEnabled = d.extensions.isForEachEnabled;
		
		var task;
		var lay = d.maxLayer;
		var arrTasks;

		f.isAwait = false;
		while(lay >= 0) {
			d.layer = lay;

			// Handle the remain functions
			d.units[lay] && d.units[lay].length && runner.exec(d.units[lay]);

			// Handle the tasks in sequence
			arrTasks = d.tasks[lay];

			// If use tas.next() instead of return in tas(), the arrTasks will be undefined.
			/* istanbul ignore else */
			if (typeof arrTasks !== 'undefined') {

				while (!f.isAwait && (task = arrTasks.shift())) {
					f.isAwait = false;

					if (typeof task === 'function') {
						runner.execFunc(task);
					}
					else
					if (isForEachEnabled && task.isForEach === true) {
						forEach.exec(task);
					}
					else {
						units.do(task);
					}
				}
			}

			lay --;
		}

		// When all tasks done, then restore flag isAwait to false
		if (!d.tasks[0].length) {
			flag.setIsAwait(false);
		}
	},

	saveTas: function(Tas_){
		Tas = Tas_;
	},

	saveForEach: function(forEach_){
		forEach = forEach_;
	}
};

module.exports.__proto__ = runner;
