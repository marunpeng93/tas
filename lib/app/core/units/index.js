/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./data'),
	require('./run'),
	require('./exec'),
	require('./status')
)})

(function(data, run, exec, status){

	var units = {
		tas: {},

		do: function(tas, tasks){
			units.tas = tas;

			tas.fixLayer(tasks);
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
			status.isBreak.set();
		},

		clear: function(){
			data.clear();
		}
	};

	module.exports = (units);
});
