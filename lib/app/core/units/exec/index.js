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
			var func, result, isBreakTask, isLoop, isContinue;

			/* istanbul ignore if */
			if (checker.isAbortTas()) return;

			while(func = data.getNextFunc(layer)) {
				global.currentFunc.save(func);

				if (checker.isForEachFunc(func) && func.isLast === true) {
					isLoop = true;
				}

				status.reset();
				result = units.run(func);

				if (global.isDone.get()) {
					break;
				}

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

			if (isLoop || isContinue) {
				var loop = require('../../../array/forEachDo/loop');
				loop.continue(isLoop);
			}
		}
	};

	module.exports = (exec);
});
