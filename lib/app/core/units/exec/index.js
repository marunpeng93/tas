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
			var tas = units.tas;

			if (checker.isReturnAbort()) {
				tas.abort();
				return;
			}

			if (global.isAwait.get()) {
				return;
			}

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

				if (checker.isReturnAbort(result)) {
					tas.abort();
					break;
				}

				if (checker.isBreakCurrentTasks(result)) {
					isBreakTask = true;
					break;
				}

				if (checker.isReturnAwait(result)) {
					global.isAwait.set();
					break;
				}

				if (checker.isReturnContinue(result)) {
					isContinue = true;
					break;
				}

				if (checker.isSyncTasksFunc(func) || checker.isGoNext()) {
					continue;
				}

				/* istanbul ignore else */
				if (checker.isAwaitTasksFunc(func)) {
					global.isAwait.set();
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
