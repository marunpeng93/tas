/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('util', function(){

	var util = {
		title: function(str){
			var line = util.repeat('-', 40);

			console.log(line);
			console.log(str);
			console.log(line);
		},

		log: function(){
			if (typeof global === 'object' && global.isDisabledLog === true) {
				return;
			}

			var args = [].slice.call(arguments);
			var times = 0;

			({
			forBrowser: function(){
				if (!util.isInBrowser()) return this;
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
				console.log.apply(console, args);
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
				util.log(str);
			});
		},

		tree: function(layer, str, extra){
			extra = extra || 0;

			var indent = util.repeat(' ', (layer - 1 + extra) * 4);
			util.log(layer + ': ' + indent + str);
		},

		repeat: function (str, times) {
			return new Array(times + 1).join(str);
		},

		isInBrowser: function(){
			return typeof process === 'undefined';
		}
	};

	return (util);
});
