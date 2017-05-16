/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./isAbort'),
	require('./currentFunc')
)})

(function(isAbort, currentFunc){

	module.exports = {
		isAbort: isAbort,
		currentFunc: currentFunc,

		reset: function(){
			isAbort.reset && isAbort.reset();
			currentFunc.reset && currentFunc.reset();
		}
	};
});