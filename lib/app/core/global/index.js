/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./isAbort')
)})

(function(isAbort){

	module.exports = {
		isAbort: isAbort,

		reset: function(){
			isAbort.reset();
		}
	};
});