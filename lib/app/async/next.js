/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../core/global'),
	require('../core/tasks'),
	require('../core/tasks/data/layer'),
	require('../core/units'),
	require('../core/units/run/pass'),
	require('../core/units/status'),
	require('../array/forEachDo')
)})

(function(global, tas, layer, units, pass, status, forEach){

	var next = {
		do: function(args){
			pass.saveArguments(args);
			status.isGoNext.set();
			global.isAbort.set(false);
			global.isAwait.set(false);

			next.resume();
		},

		resume: function(){
			var tasks;
			var lay = status.maxLayer.get();

			while(lay >= 0) {
				layer.set(lay);

				// Handle the remain functions
				units.exec(lay);

				// Handle the tasks in sequence
				while (!global.isAbort.get() && !global.isAwait.get() && (tasks = tas.getNextTasks(lay))) {
					global.reset();

					if (tasks.forEach === true) {
						forEach.do(tas, tasks);
					}
					else {
						units.do(tas, tasks);
					}
				}

				lay --;
			}
		}
	};

	module.exports = (next);
});
