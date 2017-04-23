/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var convert = {
		do: function(args, type, promise, async){
			var describe = "";
			var obj = {};

			({
			setDescribe: function(){
				typeof args[0] === "string" && (describe = args.shift());
				return this;
			},

			convertFuncToObj: function(){
				var tasks = {};
				if (args[0] instanceof Function) {
					args.forEach(function(arg, index){
						tasks['t' + (index + 1)] = arg;
					});
					args = [tasks];
				}
				return this;
			},

			packPromiseTask: function(){
				obj["promise_" + type] = function(){
					promise[type](args[0]);
				};
				return this;
			},

			applyToAwait: function(){
				var tasks = [obj];
				describe && (tasks.unshift(describe));
				async.await(tasks);
				return this;
			}

			}).setDescribe().convertFuncToObj().packPromiseTask().applyToAwait();
		}
	};

	module.exports = (convert);
})();