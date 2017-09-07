/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var units = require('./units');

var break_ = {
	do: function(){
		units.clearTheRemainingFunctions();
	}
};

module.exports.__proto__ = break_;
