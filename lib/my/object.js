/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var object = {
		data: {},
		
		get: function(prop){
			return typeof prop === 'undefined' ? this.data : this.data[prop];
		},

		set: function(data, prop){
			typeof prop === 'undefined' ? (this.data = data) : (this.data[prop] = data);
		},

		save: function(data, prop){
			this.set(data, prop);
		}
	};

	module.exports = (object);
})();
