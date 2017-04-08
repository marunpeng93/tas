/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./checker'),
	require('../data'),
	require('../status'),
	require('../../global')
)})

(function(checker, data, status, global){

	var exec = {
		do: function(units, layer){
			var func, result, isBreak;
			if (global.isAbort.get()) return;

			while(func = data.getNextFunc(layer)) {
				status.isGoNext.reset();
				result = units.run(func);

				if (global.isAbort.get()) {
					break;
				}

				if (checker.isBreakCurrentTasks(result)) {
					isBreak = true;
					break;
				}

				if (checker.isBreakTas(result)) {
					global.isAbort.set();
					break;
				}

				if (!checker.isAwaitTasksFunc(func) || status.isGoNext.get()) {
					continue;
				}

				if (checker.isAwaitTasksFunc(func)) {
					global.isAbort.set();
					break;
				}
			}

			if (isBreak) {
				data.clearRemainFunctions(func);
			}
		}
	};

	module.exports = (exec);
});