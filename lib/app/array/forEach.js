/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../core')
)})

(function(core){

	var forEach = {
		init: function(args){
			this.mark(args);
			core.do(args);
		},

		mark: function(args){
			args.forEach(function(arg){
				// arg is an Object or a Function
				arg instanceof Object && (arg.forEach = true);
			});
		}
	};

	module.exports = (forEach);
});
