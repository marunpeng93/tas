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
			var func, result, isBreakTask, isContinue;

			/* istanbul ignore if */
			if (checker.isAbortTas()) return;

			while(func = data.getNextFunc(layer)) {

				if (checker.isForEachFunc(func) && func.isLast === true) {
					isContinue = true;
				}

				status.reset();
				result = units.run(func);

				if (checker.isAbortTas(result)) {
					global.isAbort.set();
					break;
				}

				if (checker.isBreakCurrentTasks(result)) {
					isBreakTask = true;
					break;
				}

				if (checker.isIgnoreThisFunc(result)) {
					status.isGoNext.set();
				}

				if (checker.isAwaitInSyncFunc(result)) {
					global.isAbort.set();
					break;
				}

				if (checker.isContinue(result)) {
					isContinue = true;
					break;
				}

				if (checker.isSyncTasksFunc(func) || checker.isGoNext()) {
					continue;
				}

				/* istanbul ignore else */
				if (checker.isAwaitTasksFunc(func)) {
					global.isAbort.set();
					break;
				}
			}

			if (isBreakTask) {
				data.clearRemainFunctions(func);
			}
			else if (isContinue) {
				global.isAbort.set(false);

				var loop = require('../../../array/forEachDo/loop');
				loop.do();
			}
		}
	};

	module.exports = (exec);
});
