/**
 * Tester of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('tester', function(){

	var tester = {
		data: [],

		init: function(data){
			this.data = data;
		},

		test: function(describe, tas, exp, val, isKarma){
			var result, count;

			({
			test: function(){
				result = exp === val ? 'ok' : 'x';
				count = tas.count = typeof tas.count === 'undefined' ? 1 : tas.count + 1;
				count = ('00' + count).substr(-2);
				return this;
			},

			printLog: function(){
				var info = '%s %s -- %s -- should return %s';
				isKarma && karmaDebugger && karmaDebugger.info(info, result, count, describe, exp);
				console.log(info, result, count, describe, exp);
				return this;
			},

			onFailed: function(){
				result === 'x' && tas.abort();
				return this;
			}

			}).test().printLog().onFailed();
		},

		getFiles: function(options){
			var isTestFileOnly, isNoExtName, prefix;
			var data = this.data;
			var arr = [];

			({
			init: function(){
				var getOptions = {
					do: function(options, prop, def){
						options = options || {};
						return typeof options[prop] === 'undefined' ? def : options[prop];
					}
				};

				isTestFileOnly = getOptions.do(options, 'isTestFileOnly', false);
				isNoExtName = getOptions.do(options, 'isNoExtName', false);
				prefix = getOptions.do(options, 'prefix', './');
				prefix.substr(-1) !== '/' && (prefix += '/');

				return this;
			},

			getFiles: function(){
				data.forEach(function(file){

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
				return this;
			}

			}).init().getFiles();
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
});
