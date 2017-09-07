/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var util = {
	convert: function(obj, This){
		return function(){
			var keys = Object.keys(obj);
			for (var i = 0; i < keys.length; i++) {
				obj[keys[i]].call(This);
			}
		}
	}
};

module.exports.__proto__ = util;
