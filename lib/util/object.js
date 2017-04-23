/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var extend = {
		do: function(target, source, checker){
			Object.keys(source).forEach(function (key) {

				//if (typeof source[key] === 'object' && typeof target[key] === 'object') {
				//	extend.do(target[key], source[key]);
				//}

				/* istanbul ignore else */
				if (typeof target[key] === 'undefined' && (!checker || checker(source, target, key))) {
					target[key] = source[key];
				}
			});
		}
	};

	var object = {
		extend: function () {
			var args = [].slice.call(arguments);
			var target = args.length > 1 ? args.shift() : /* istanbul ignore next */ {};

			args.forEach(function (source) {
				extend.do(target, source);
			});

			return target;
		},

		cloneMethods: function(){
			var args = [].slice.call(arguments);
			var target = args.length > 1 ? args.shift() : /* istanbul ignore next */ {};

			var checker = function(source, target, key){
				return typeof source[key] === 'function';
			};

			args.forEach(function (source) {
				extend.do(target, source, checker);
			});

			return target;
		}
	};

	module.exports = (object);
})();