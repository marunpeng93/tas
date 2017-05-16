/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var string = {
		data: "",

		get: function(){
			return this.data;
		},

		set: function(str){
			this.data = str;
		},

		save: function(str){
			this.set(str);
		},

		clear: function(){
			this.data = "";
		},

		reset: function(){
			this.clear();
		}
	};

	module.exports = (string);
})();
