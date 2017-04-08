/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function(){

	var object = {
		data: {},
		
		get: function(prop){
			return typeof prop === 'undefined' ? this.data : this.data[prop];
		},

		set: function(func, prop){
			typeof prop === 'undefined' ? (this.data = func) : (this.data[prop] = func);
		},

		save: function(func, prop){
			this.set(func, prop);
		}
	};

	module.exports = (object);
})();
