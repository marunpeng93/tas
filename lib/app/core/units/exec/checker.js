/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../status'),
	require('../../global')
)})

(function(status, global){

	var checker = {
		isAwaitTasksFunc: function(func){
			return func.await || func.root.await;
		},

		isAwaitInSyncFunc: function(result){
			return result === 'await';
		},

		isBreakCurrentTasks: function(result){
			return result === "break" || result === false || status.isBreak.get();
		},

		isAbortTas: function(result){
			return result === "abort" || global.isAbort.get();
		},

		isSyncTasksFunc: function(func){
			return !checker.isAwaitTasksFunc(func);
		},

		isGoNext: function(){
			return status.isGoNext.get();
		},

		isForEachFunc: function(func) {
			return func.root.forEach === true;
		},

		isContinue: function(result){
			return result === 'continue';
		}
	};

	module.exports = (checker);
});
