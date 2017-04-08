/**
 * Tas.js v2.0.0
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

		break: function(){
			tasks.break();
		}
	};

	module.exports = (core);
});