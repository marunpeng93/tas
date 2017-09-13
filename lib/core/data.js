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
		isAwait: false,
		isAbort: false
	},

	extensions: {
		isPromiseAllEnabled: false,
		isPromiseRaceEnabled: false,
		isForEachEnabled: false,
		isTreeEnabled: false
	}
};

module.exports = data;
