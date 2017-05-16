/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var number = {
		value: 0,
		
		get: function(){
			return this.value;
		},

		add: function(){
			this.value ++;
			return this.value;
		},

		sub: function(){
			this.value --;
			return this.value;
		},

		set: function(val){
			this.value = val;
		},

		save: function(val){
			this.set(val);
		},

		clear: function(){
			this.value = 0;
		},

		reset: function(){
			this.clear();
		}
	};

	module.exports = (number);
})();