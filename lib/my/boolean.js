/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var DEFAULT = false;

	var boolean = {
		value: DEFAULT,

		get: function(){
			return this.value;
		},

		set: function(val){
			typeof val === 'undefined' && (val = !DEFAULT);
			this.value = val;
		},

		clear: function(){
			this.value = DEFAULT;
		},

		reset: function(){
			this.clear();
		}
	};

	module.exports = (boolean);
})();