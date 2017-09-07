/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var data = {
	layer: 0,
	maxLayer: 0,

	tasks: {},
	units: {},
	pass: [],

	flag: {
		hasAsync: false,
		isAwait: false,
		isAbort: false
	},

	extensions: {
		isPromiseAllEnabled: false,
		isPromiseRaceEnabled: false,
		isForEachEnaboed: false,
		isLogTreeEnabled: false
	},

	currentTask: {
		layer: 0,
		root: null
	}
};

module.exports.__proto__ = data;
