/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var canceler = {
		getAbortFunc: function(obj){
			if (typeof obj.abort !== 'undefined' && obj.abort instanceof Function){
				return obj.abort;
			}
		},

		doWithCustomize: function(handlers){
			var func = canceler.getAbortFunc(handlers);
			func && func();
			return typeof func !== 'undefined';
		},

		doWithDefault: function(handlers){
			handlers.forEach(function(hdl){
				var func;

				// Only valid for web.
				if (typeof XMLHttpRequest !== "undefined" && hdl instanceof XMLHttpRequest) {
					if (hdl.readyState !== XMLHttpRequest.UNSENT) {
						hdl.abort();
					}
				}
				else {
					// The ajax or request object has abort() method, such as
					// Superagent (one of Node.js third-party modules).
					func = canceler.getAbortFunc(hdl);
					if (func) {
						func();
					}
					else {
						// Valid for NodeJS and web.
						clearTimeout(hdl);
					}
				}
			});
		},

		cancel: function(handlers){
			if (!handlers || !(handlers instanceof Array)) return;

			handlers.forEach(function(hdl){
				hdl.abort && hdl.abort instanceof Function && hdl.abort();
			});
		}
	};

	module.exports = (canceler);
})();