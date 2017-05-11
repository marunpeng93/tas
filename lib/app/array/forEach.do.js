/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../core/units'),
	require('../core/units/run/pass'),
	require('../core/global'),
	require('../../util')
)})

(function(units, pass, global, util){

	var forEach = {
		do: function(tas, tasks){

			var args = pass.getArguments();
			/* istanbul ignore next */
			if (!args || !(args instanceof Array) || !(args[0] instanceof Array)) return;

			var arr = args[0];
			var i = 0;

			// Use for loop instead of Array.find() to compatible
			// with versions lower than Node.js 4.0.
			for (; i < arr.length; i++) {
				var arg = arr[i];

				/* istanbul ignore next */
				if (global.isAbort.get() === true) {
					break;
				}

				var thisTasks = util.object.cloneMethods(tasks);
				/* istanbul ignore else */
				if (typeof thisTasks.init === 'function') {
					thisTasks.init(arg, i, arr);
					delete thisTasks.init;
				}

				units.do(tas, thisTasks);
			}
		}
	};

	module.exports = (forEach);
});
