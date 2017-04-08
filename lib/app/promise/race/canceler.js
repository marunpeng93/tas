/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function(){

	var canceler = {
		get: function(handlers){
			var func;

			if (typeof handlers.do !== 'undefined' && handlers.do instanceof Function){
				func = handlers.do;
			}
			else {
				Object.keys(handlers).find(function(key){
					if (handlers[key] instanceof Function) {
						func = handlers[key];
						return key;
					}
				});
			}
			return func;
		},

		doWithCustomize: function(handlers){
			var func = canceler.get(handlers);
			func && func();
			return typeof func !== 'undefined';
		},

		doWithDefault: function(handlers){
			handlers.forEach(function(handler){

				// Only valid for web.
				if (typeof XMLHttpRequest !== "undefined" && handler instanceof XMLHttpRequest) {
					if (handler.readyState !== XMLHttpRequest.UNSENT) {
						handler.abort();
					}
				}
				else {
					// Valid for NodeJS and web.
					clearTimeout(handler);
				}
			});
		}
	};

	module.exports = (canceler);
})();