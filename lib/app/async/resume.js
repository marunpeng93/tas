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
	require('../core/units/status')
)})

(function(global, tas, layer, units, status){

	var resume = {
		do: function(){
			({
			setState: function(){
				global.isAbort.set(false);
				return this;
			},

			handleTheTasks: function(){
				var tasks;
				var lay = status.maxLayer.get();

				while(lay >= 0) {
					layer.set(lay);

					// Handle the remain functions
					units.exec(lay);

					// Handle the tasks in cache
					while (!global.isAbort.get() && (tasks = tas.getNextTasks(lay))) {
						global.reset();
						units.do(tas, tasks);
					}

					lay --;
				}
				return this;
			}
			}).setState().handleTheTasks();
		}
	};

	module.exports = (resume);
});