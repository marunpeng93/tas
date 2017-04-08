/**
 * Tas.js v2.0.0
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var pass = {
		data: [],
		
		getArguments: function(){
			return this.data;
		},

		saveArguments: function(arr){
			this.data = arr;
		}
	};

	module.exports = (pass);
})();