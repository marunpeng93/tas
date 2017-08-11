/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./isAbort'),
	require('./isAwait'),
	require('./isDone'),
	require('./currentFunc')
)})

(function(isAbort, isAwait, isDone, currentFunc){

	module.exports = {
		isAbort: isAbort,
		isAwait: isAwait,
		isDone: isDone,
		currentFunc: currentFunc,

		reset: function(){
			isAbort.reset && isAbort.reset();
			isAwait.reset && isAwait.reset();
			isDone.reset && isDone.reset();
			currentFunc.reset && currentFunc.reset();
		}
	};
});
