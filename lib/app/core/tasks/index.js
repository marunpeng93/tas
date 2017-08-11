/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./data'),
	require('../units'),
	require('../global'),
	require('../../array/forEachDo')
)})

(function(data, units, global, forEach){

	var tas = {
		do: function(args){
			data.add(args);
			global.isDone.set(false);

			if (!global.isAbort.get() && !global.isAwait.get()) {
				tas.exec();
			}
		},

		exec: function(){
			var tasks = data.getNextTasks();
			if (tasks.forEach === true) {
				forEach.do(tas, tasks);
			}
			else {
				units.do(tas, tasks);
			}
		},

		break: function(err){
			err && /* istanbul ignore next */ console.log(err);
			units.break();
		},

		abort: function(err){
			err && /* istanbul ignore next */ console.log(err);

			tas.reset();
			global.isAbort.set();

			setTimeout(function(){
				global.isAbort.set(false);
			}, 0);
		},

		done: function(msg){
			msg && /* istanbul ignore next */ console.log(msg);

			tas.reset();
			global.isDone.set();
		},

		reset: function(){
			global.reset();
			data.clear();
			units.clear();
		},

		getNextTasks: function(layer){
			return data.getNextTasks(layer);
		},

		fixLayer: function(tasks) {
			data.fixLayer(tasks);
		}
	};

	module.exports = (tas);
});
