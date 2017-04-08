/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var object = {
		extend: function () {
			var args = [].slice.call(arguments);
			var target = args.length > 1 ? args.shift() : {};

			var extend = {
				do: function(target, source){
					Object.keys(source).forEach(function (key) {

						if (typeof source[key] === 'object' && typeof target[key] === 'object') {
							extend.do(target[key], source[key]);
						}

						if (typeof target[key] === 'undefined') {
							target[key] = source[key];
						}
					});
				}
			};

			args.forEach(function (source) {
				extend.do(target, source);
			});

			return target;
		}
	};

	module.exports = (object);
})();