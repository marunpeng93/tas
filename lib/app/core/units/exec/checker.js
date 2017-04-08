/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var checker = {
		isAwaitTasksFunc: function(func){
			return func.root.await;
		},

		isBreakCurrentTasks: function(result){
			return result === "break" || result === false;
		},

		isBreakTas: function(result){
			return result === "break!";
		}
	};

	module.exports = (checker);
})();