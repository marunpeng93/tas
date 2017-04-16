/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var race = {
		do: function(tasks, promise){
			var count = 0;

			tasks.done = function(err, data, handlers){
				if (++count === 1) {
					race.cancel(handlers);
					promise.done([err, data]);
				}
			};

			promise.exec(tasks);
		},

		cancel: function(handlers){
			if (!handlers || !(handlers instanceof Array)) return;

			handlers.forEach(function(handle){

				/* istanbul ignore next */

				// For web
				if (typeof XMLHttpRequest !== "undefined" && handle instanceof XMLHttpRequest) {
					if (handle.readyState !== XMLHttpRequest.UNSENT) {
						handle.abort();
					}
				}
				else {
					// The ajax or request object has abort() method, such as
					// Superagent (one of Node.js third-party modules).
					if (typeof handle.abort !== 'undefined' && handle.abort instanceof Function) {
						handle.abort();
					}
					else {
						// Valid for NodeJS and web.
						// Whatever the value of handle is, clearTimeout() will not go wrong,
						// so we do not need to determine the type of handle or use try..catch.
						clearTimeout(handle);
					}
				}
			});
		}
	};

	module.exports = (race);
})();