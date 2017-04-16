/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./resume'),
	require('../core/global'),
	require('../core/units/run/pass'),
	require('../core/units/status')
)})

(function(resume, global, pass, status){

	var async = {
		do: function(args){
			pass.saveArguments(args);
			status.isGoNext.set();

			/* istanbul ignore else */
			if (global.isAbort.get()) {
				async.resume();
			}
		},

		resume: function(){
			resume.do();
		}
	};

	module.exports = (async);
});