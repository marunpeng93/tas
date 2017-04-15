/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./app'),
	require('./util'),
	require('./app/core/tasks/data/layer'),
	require('./app/core/units/status/maxLayer')
)})

(function(app, util, layer, maxLayer){

	var basic = {

		// Break the current tasks.
		break: function(err){
			app.break(err);
		},

		// Break Tas from nested function (closures).
		abort: function(err){
			app.abort(err);
		}
	};

	var async = {
		await: function(){
			app.await([].slice.call(arguments));
		},

		next: function(){
			app.next([].slice.call(arguments));
		}
	};

	var promise = {
		promise: function(){
			app.promise([].slice.call(arguments));
		},

		all: function(){
			app.all([].slice.call(arguments));
		},

		race: function(){
			app.race([].slice.call(arguments));
		},

		cancel: function(args){
			app.cancel(args);
		}
	};

	// For debugging
	Object.defineProperty(app.entry, 'layer', {
		get: function(){
			return layer.get();
		}
	});

	Object.defineProperty(app.entry, 'maxLayer', {
		get: function(){
			return maxLayer.get() + 1;
		}
	});

	module.exports = util.object.extend(app.entry, basic, async, promise);
});
