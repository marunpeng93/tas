/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
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
			if (checker.isAbortTas()) return;

			while(func = data.getNextFunc(layer)) {

				status.reset();
				result = units.run(func);

				if (checker.isAbortTas(result)) {
					global.isAbort.set();
					break;
				}

				if (checker.isBreakCurrentTasks(result)) {
					isBreak = true;
					break;
				}

				if (checker.isIgnoreThisFunc(result)) {
					status.isGoNext.set();
				}

				if (checker.isAwaitInSyncFunc(result)) {
					global.isAbort.set();
					break;
				}

				if (checker.isSyncTasksFunc(func) || checker.isGoNext()) {
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