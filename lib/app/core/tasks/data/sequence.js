/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./layer')
)})

(function(layer){
	
	var sequence = {
		data: {},
		
		saveTasks: function(obj){
			var lay = layer.get();
			obj.layer = lay;

			typeof this.data[lay] === 'undefined' && (this.data[lay] = []);
			this.data[lay].push(obj);
		},

		getNextTasks: function(lay){
			var arr = this.data[lay || layer.get()];
			return arr ? arr.shift() : null;
		},

		clear: function(){
			this.data = {};
			layer.clear();
		}
	};

	module.exports = (sequence);
});