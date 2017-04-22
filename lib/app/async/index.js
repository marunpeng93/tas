/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./next'),
	require('../core/global'),
	require('../core/units/run/pass'),
	require('../core/units/status')
)})

(function(next, global, pass, status){

	var async = {
		next: function(args){
			pass.saveArguments(args);
			status.isGoNext.set();

			/* istanbul ignore else */
			if (global.isAbort.get()) {
				next.do();
			}
		}
	};

	module.exports = (async);
});