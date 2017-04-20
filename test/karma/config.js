/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// Thanks David Calhoun: http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function(r,f){if(typeof process==='object'&&process.title.indexOf("node")>=0){module.exports=f(r);return;}if(typeof define==='function'&&define.amd){define(function(){return f(r,r.document)});return}if(typeof exports==='object'){module.exports=r.document?f(r,r.document):function(w){return f(w,w.document)};return}f(r,r.document)}(typeof window!=="undefined"?window:this,function(window, document){

	var isLocalTest = 0;
	var isKarma = 1;

	var defaultCfg = {
		root: 'https://raw.githubusercontent.com/tasjs/tas/master/',
		waitTime: 1000,
		netTimeout: 3*60*1000
	};

	var localCfg = {
		root: '/mynodejs/tas/', // project root path
		waitTime: 1000,
		netTimeout: 3*60*1000
	};

	var karmaCfg = {
		root: '/', // http://localhost:9876/
		waitTime: 1000,
		netTimeout: 3*60*1000,
		isKarma: true
	};

	var config = isKarma ? karmaCfg : isLocalTest ? localCfg : defaultCfg;

	typeof window === 'object' && typeof define !== 'function' &&
	typeof exports !== 'object' && (window.config = config);

	return config;
}));
