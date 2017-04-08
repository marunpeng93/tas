/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./data'),
	require('../units'),
	require('../global')
)})

(function(data, units, global){

	var tas = {
		do: function(args){
			data.add(args);
			!global.isAbort.get() && tas.exec();
		},

		exec: function(){
			var tasks = data.getNextTasks();
			units.do(tas, tasks);
		},

		break: function(){
			global.isAbort.set();
		},

		getNextTasks: function(layer){
			return data.getNextTasks(layer);
		}
	};

	module.exports = (tas);
});