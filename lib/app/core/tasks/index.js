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
			!global.isAbort.get() && tas.exec();
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
			tas.done(err);
		},

		done: function(msg){
			msg && /* istanbul ignore next */ console.log(msg);

			global.reset();
			data.clear();
			units.clear();
			global.isDone.set();
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
