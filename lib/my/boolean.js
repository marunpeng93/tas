/**
 * Tas.js v2.0.0
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

		reset: function(){
			this.set(DEFAULT);
		}
	};

	module.exports = (boolean);
})();