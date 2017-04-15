/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./tasks')
)})

(function(tasks){

	var core = {
		do: function(args){
			tasks.do(args);
		},

		next: function(args){
			tasks.next(args);
		},

		break: function(err){
			tasks.break(err);
		},

		abort: function(err){
			tasks.abort(err);
		}
	};

	module.exports = (core);
});