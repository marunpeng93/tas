/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

// Thanks David Calhoun
// Reference: What Is AMD, CommonJS, and UMD?
// http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function (root, factory) {

	if (typeof process === 'object' && process.title === "node") { // NodeJS
		module.exports = factory(root);
		return;
	}

	if (typeof define === 'function' && define.amd) { // Web AMD
		define(function () {
			return factory(root, root.document);
		})
		return;
	}

	if (typeof exports === 'object') { // Web CMD
		module.exports = root.document ? factory(root, root.document) : function (window) {
			return factory(window, window.document);
		}
		return;
	}

	// Web
	root.utils = factory(root, root.document);

}(typeof window !== "undefined" ? window : this, function (window, document) {

	// Utils of examples of Tas.js
	var utils = {
		title: function(str){
			var line = utils.repeat('-', 40);

			console.log(line);
			console.log(str);
			console.log(line);
		},

		log: function(){
			var args = [].slice.call(arguments);
			var times = 0;

			({
			forBrowser: function(){
				if (!utils.isInBrowser()) return this;
				if (args.length === 0) {
					args = ['\n'];
				}
				else {
					args.forEach(function(a){
						if (typeof a === 'string' && /\n$/.test(a)) {
							times ++;
						}
					});
				}
				return this;
			},

			printLog: function(){
				console.log.apply(null, args);
				return this;
			},

			printSpaceLine: function(){
				var i = 0;
				for (; i < times; i++) {
					console.log('\n');
				}
				return this;
			}

			}).forBrowser().printLog().printSpaceLine();
		},

		logs: function(){
			var args = [].slice.call(arguments);
			args.forEach(function(str){
				utils.log(str);
			});
		},

		tree: function(layer, str, extra){
			extra = extra || 0;

			var indent = utils.repeat(' ', (layer - 1 + extra) * 4);
			console.log(layer + ': ' + indent + str);
		},

		repeat: function (str, times) {
			return new Array(times + 1).join(str);
		},

		isInBrowser: function(){
			return typeof process === 'undefined';
		}
	};

	return utils;
}));
