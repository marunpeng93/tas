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

			tasks.done = function(err, data){
				if (++count === 1) {
					promise.done([err, data]);
				}
			};

			promise.exec(tasks);
		},

		cancel: function(handlers){

			/* istanbul ignore next */
			if (!handlers || !(handlers instanceof Array)) return;

			handlers.forEach(function(handle){

				/* istanbul ignore next */
				if (handle.abort) {

					// For web
					if (typeof XMLHttpRequest !== 'undefined' && handle instanceof XMLHttpRequest) {
						if (handle.readyState !== XMLHttpRequest.UNSENT) {
							handle.abort();
						}
					}
					else {
						// The ajax or request object has abort() method, such as
						// Superagent (one of Node.js third-party modules).
						handle.abort();
					}
				}
				else {
					// Valid for NodeJS and web.
					clearTimeout(handle);
				}
			});
		}
	};

	module.exports = (race);
})();