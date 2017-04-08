/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./core'),
	require('./async'),
	require('./promise'),
	require('../util')
)})

(function(core, async, promise, util){

	var tas = {
		entry: function(){
			tas.do([].slice.call(arguments));
		},

		do: function(args){
			core.do(args);
		},

		break: function(){
			core.break();
		}
	};

	var asy = {
		await: function(args){
			args.await = true;
			tas.do(args);
		},

		next: function(args){
			async.do(args);
		}
	};

	var pro = {
		promise: function(args){
			pro.convert(args, "promise");
		},

		all: function(args){
			pro.convert(args, "all");
		},

		race: function(args){
			pro.convert(args, "race");
		},

		convert: function(args, type){
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
				obj["Promise " + type] = function(){
					promise[type](args[0]);
				};
				return this;
			},

			applyToAwait: function(){
				var tasks = [obj];
				describe && (tasks.unshift(describe));
				asy.await(tasks);
				return this;
			}

			}).setDescribe().convertFuncToObj().packPromiseTask().applyToAwait();
		}
	};

	module.exports = util.object.extend(tas, asy, pro);
});
