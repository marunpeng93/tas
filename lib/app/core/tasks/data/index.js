/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./id'),
	require('./sequence')
)})

(function(id, sequence){

	var objects = {

		add: function(args){
			var describe;
			var obj;

			({
			saveDescribe: function(){
				typeof args[0] === 'string' && (describe = args.shift());
				typeof args[0] === 'object' && (obj = args[0]);
				return this;
			},

			packFunctions: function(){
				if (args[0] instanceof Function) {
					obj = {};
					args.forEach(function(func, index){
						obj['t' + (index + 1)] = func;
					});
				}
				return this;
			},

			saveTasks: function(){
				obj.name = describe ? describe : 'Tasks[' + id.add() + ']';
				sequence.saveTasks(obj);
				return this;
			}

			}).saveDescribe().packFunctions().saveTasks();
		},

		clear: function(){
			id.clear();
			sequence.clear();
		},

		getNextTasks: function(layer){
			return sequence.getNextTasks(layer);
		}
	};

	module.exports = (objects);
});