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
	require('../../array/forEach.do')
)})

(function(data, units, global, forEach){

	var tas = {
		do: function(args){
			data.add(args);
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
			err && /* istanbul ignore next */ console.log(err);
			global.isAbort.set();
		},

		reset: function(){
			global.reset();
			data.clear();
			units.clear();
		},

		getNextTasks: function(layer){
			return data.getNextTasks(layer);
		}
	};

	module.exports = (tas);
});
