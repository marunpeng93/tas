/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./canceler')
)})

(function(canceler){

	var race = {
		do: function(tasks, promise){
			var count = 0;

			tasks.done = function(err, data, handlers){
				if (++count === 1) {
					if (handlers && typeof handlers === 'object') {
						if (canceler.doWithCustomize(handlers) === false) {
							canceler.doWithDefault(handlers);
						}
					}
					promise.done([err, data]);
				}
			};

			promise.exec(tasks);
		}
	};

	module.exports = (race);
});