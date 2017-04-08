/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./all'),
	require('./race'),
	require('../async')
)})

(function(all, race, async){

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
			async.do(args);
		}
	};

	module.exports = (promise);
});