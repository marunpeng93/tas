/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../core'),
	require('../core/units'),
	require('../core/units/run/pass'),
	require('../core/global'),
	require('../../util')
)})

(function(core, units, pass, global, util){

	var forEach = {
		init: function(args){
			this.mark(args);
			core.do(args);
		},

		mark: function(args){
			args.forEach(function(arg){
				// arg is an Object or a Function
				arg instanceof Object && (arg.forEach = true);
			});
		},

		do: function(tas, tasks){
			var args = pass.getArguments();
			/* istanbul ignore next */
			if (!args || !(args instanceof Array) || !(args[0] instanceof Array)) return;

			var arr = args[0];
			arr.find(function(arg){

				/* istanbul ignore next */
				if (global.isAbort.get() === true) {
					return arg;
				}

				var thisTasks = util.object.cloneMethods(tasks);
				/* istanbul ignore else */
				if (typeof thisTasks.init === 'function') {
					thisTasks.init(arg);
					delete thisTasks.init;
				}

				units.do(tas, thisTasks);
			});
		}
	};

	module.exports = (forEach);
});
