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
	require('./array'),
	require('../util')
)})

(function(core, async, promise, array, util){

	var tas = {
		entry: function(){
			tas.do([].slice.call(arguments));
		},

		do: function(args){
			core.do(args);
		},

		break: function(err){
			core.break(err);
		},

		abort: function(err){
			core.abort(err);
		},

		reset: function(){
			core.reset();
		}
	};

	var asy = {
		await: function(args){
			async.await(args);
		},

		next: function(args){
			async.next(args);
		}
	};

	var pro = {
		promise: function(args){
			promise.convert(args, "promise");
		},

		all: function(args){
			promise.convert(args, "all");
		},

		race: function(args){
			promise.convert(args, "race");
		},

		cancel: function(args){
			promise.cancel(args);
		}
	};

	var arr = {
		forEach: function(args){
			array.forEach(args);
		},

		continue: function(){
			array.continue();
		}
	};

	module.exports = util.object.extend(tas, asy, pro, arr);
});
