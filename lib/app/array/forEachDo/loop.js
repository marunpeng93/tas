/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./data'),
	require('../../core/global'),
	require('../../core/units'),
	require('../../core/units/data'),
	require('../../../util')
)})

(function(data, global, units, udata, util){

	var loop = {
		do: function(){

			/* istanbul ignore next */
			if (global.isAbort.get() === true) {
				return;
			}

			var elements = data.getElements();
			var element = elements.shift();
			if (!element) return;

			var tas = data.getTas();
			var tasks = data.getTasks();
			var index = data.getIndex();

			var thisTasks = util.object.extend(tasks);
			/* istanbul ignore else */
			if (typeof thisTasks.init === 'function') {
				thisTasks.init(element, index, elements);
				delete thisTasks.init;
			}

			units.do(tas, thisTasks);
		},

		continue: function(isNoNeedToClear){
			global.isAbort.set(false);

			if (!isNoNeedToClear) {
				var func = global.currentFunc.get();
				udata.clearRemainFunctions(func);
			}

			loop.do();
		}
	};

	module.exports = (loop);
});
