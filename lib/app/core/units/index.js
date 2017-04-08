/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./data'),
	require('./run'),
	require('./exec'),
	require('../global')
)})

(function(data, run, exec, global){

	var units = {
		tas: {},

		do: function(tas, tasks){
			units.tas = tas;

			data.add(tasks);
			units.exec(tasks.layer);
		},

		exec: function(layer){
			exec.do(units, layer);
		},

		run: function(func){
			return run.do(func);
		},

		break: function(){
			global.isAbort.set();
		}
	};

	module.exports = (units);
});