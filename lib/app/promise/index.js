/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./all'),
	require('./race'),
	require('./convert'),
	require('../async')
)})

(function(all, race, convert, async){

	var promise = {
		promise: function(tasks){
			tasks.done = function(err, data){
				promise.done([err, data]);
			};

			promise.exec(tasks);
		},

		all: function(tasks){
			all.do(tasks, promise);
		},

		race: function(tasks){
			race.do(tasks, promise);
		},
		
		exec: function(tasks){
			Object.defineProperty(tasks, "done", {
				enumerable: false
			});

			Object.keys(tasks).forEach(function(func){
				tasks[func]();
			});
		},

		done: function(args){
			async.next(args);
		},

		cancel: function(args){
			race.cancel(args);
		},

		convert: function(args, type){
			convert.do(args, type, promise, async);
		}
	};

	module.exports = (promise);
});