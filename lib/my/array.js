/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var array = {
		data: [],

		get: function(){
			return this.data;
		},

		set: function(arr){
			this.data = arr;
		},

		pop: function(){
			return this.data.pop();
		},

		push: function(element){
			this.data.push(element);
		},

		shift: function(){
			return this.data.shift();
		},

		unshift: function(element){
			this.data.unshift(element);
		},

		clear: function(){
			this.data = [];
		}
	};

	module.exports = (array);
})();
