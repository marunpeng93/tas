/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./loop'),
	require('./data'),
	require('../../core/units/run/pass'),
	require('../../core/global')
)})

(function(loop, data, pass, global){

	var forEach = {
		do: function(tas, tasks){
			var args = pass.getArguments();

			/* istanbul ignore next */
			if (!args || !(args instanceof Array) || !(args[0] instanceof Array)) return;

			var elements = args[0];
			data.save(elements, tas, tasks);
			loop.do();
		},

		continue: function(){
			global.isAbort.set(false);
			loop.do();
		}
	};

	module.exports = (forEach);
});
