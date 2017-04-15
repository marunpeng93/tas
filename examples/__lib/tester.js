/**
 * Tester of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
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
		});
		return;
	}

	if (typeof exports === 'object') { // Web CMD
		module.exports = root.document ? factory(root, root.document) : function (window) {
			return factory(window, window.document);
		};
		return;
	}

	// Web
	root.tester = factory(root, root.document);

}(typeof window !== "undefined" ? window : this, function (window, document) {

	// Tester of examples of Tas.js
	var tester = {
		data: [],

		init: function(data){
			this.data = data;
		},

		test: function(describe, tas, exp, val){
			var result = exp === val ? 'ok' : 'x';
			var count = tas.count = typeof tas.count === 'undefined' ? 1 : tas.count + 1;
			count = ('00' + count).substr(-2);

			console.log('%s %s -- %s -- should return %s', result, count, describe, exp);
			result === 'x' && tas.abort();
		},

		getFiles: function(options){
			var getOption = function(options, prop, def){
				options = options || {};
				return typeof options[prop] === 'undefined' ? def : options[prop];
			};

			var isTestFileOnly = getOption(options, 'isTestFileOnly', false);
			var isNoExtName = getOption(options, 'isNoExtName', false);
			var prefix = getOption(options, 'prefix', './');
			var arr = [];

			prefix.substr(-1) !== '/' && (prefix += '/');
			this.data.forEach(function(file){

				if (!file) return;
				if (!isTestFileOnly || /\.test\b/.test(file)) {

					if (isNoExtName) {
						file = file.replace(/\.js$/, '');
					}

					if (prefix) {
						file  = prefix + file;
					}

					arr.push(file);
				}
			});

			return arr;
		},

		getOrder: function(modules){
			var obj = {};
			for (var i = 1; i < modules.length; i ++) {
				obj[modules[i]] = [modules[i - 1]];
			}
			return obj;
		},

		getNumber: function(testFiles){
			var number = 0;
			testFiles.forEach(function(file){
				if (/\.test\b/.test(file)) number ++;
			});
			return number;
		}

	};

	return (tester);
}));
