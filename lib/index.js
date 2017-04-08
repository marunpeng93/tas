/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
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

		// Abort Tas from nested function (closures).
		break: function(){
			app.break();
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
