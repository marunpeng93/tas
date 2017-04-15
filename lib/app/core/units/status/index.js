/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

module.exports = {

	isGoNext: require('./isGoNext'),
	isBreak: require('./isBreak'),
	maxLayer: require('./maxLayer'),

	reset: function(){
		this.isGoNext.reset();
		this.isBreak.reset();
	}
};
