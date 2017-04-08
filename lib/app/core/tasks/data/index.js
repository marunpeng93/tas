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
			var isAwait = args.await;

			({
			saveDescribe: function(){
				if (typeof args[0] === 'string'){
					describe = args.shift();
				}
				return this;
			},

			packFunctions: function(){
				if (args[0] instanceof Function) {
					var obj = {};
					args.forEach(function(func, index){
						obj['t' + (index + 1)] = func;
					});
					args = [obj];
				}
				return this;
			},

			saveTasks: function(){
				args.forEach(function(obj, index){
					id.add();

					if (!obj.name) {
						obj.name = utils.getObjName(describe, args, id.get(), index);
					}

					isAwait && (obj.await = true);
					sequence.saveTasks(obj);
				});
				return this;
			}

			}).saveDescribe().packFunctions().saveTasks();
		},

		getNextTasks: function(layer){
			return sequence.getNextTasks(layer);
		}
	};

	var utils = {
		getObjName: function (describe, args, id, index) {
			var name = "";
			if (describe) {
				if (args.length === 1) {
					name = describe;
				}
				else {
					name = describe + "[" + (index + 1) + "]";
				}
			}
			else {
				name = 'Tasks[' + id + ']';
			}
			return name;
		}
	};

	module.exports = (objects);
});