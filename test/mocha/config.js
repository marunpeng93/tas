/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){

	var isLocalTest = 0;

	var defaultCfg = {
		root: 'https://raw.githubusercontent.com/tasjs/tas/master/',
		time: 1000
	};

	var localCfg = {
		root: '/mynodejs/tas/',
		time: 0
	};

	module.exports = (isLocalTest ? localCfg : defaultCfg);
})();