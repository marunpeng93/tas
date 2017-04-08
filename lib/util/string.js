/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var string = {
		repeat: function (str, times) {
			return new Array(times + 1).join(str);
		}
	};

	module.exports = (string);
})();