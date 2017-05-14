/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var loop = {
		data: {},
		currentId: null,

		save: function(elements, tas, tasks){
			var id = Date.now();

			this.currentId = id;
			this.data[id] = {
				elements: elements,
				tas: tas,
				tasks: tasks,
				index: -1
			};

			return id;
		},

		get: function(id, ename){
			return this.data[id || this.currentId][ename];
		},

		set: function(id, ename, value){
			return this.data[id || this.currentId][ename] = value;
		},

		getElements: function(id) {
			return this.get(id, 'elements');
		},

		getTas: function(id) {
			return this.get(id, 'tas');
		},

		getTasks: function(id) {
			return this.get(id, 'tasks');
		},

		getIndex: function(id) {
			var val = this.get(id, 'index');
			this.set(id, 'index', val ++);
			return val;
		}
	};

	module.exports = (loop);
})();
