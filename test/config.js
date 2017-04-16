/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(r,f){if(typeof process==='object'&&process.title==="node"){module.exports=f(r);return;}if(typeof define==='function'&&define.amd){define(function(){return f(r,r.document)});return}if(typeof exports==='object'){module.exports=r.document?f(r,r.document):function(w){return f(w,w.document)};return}f(r,r.document)}(typeof window!=="undefined"?window:this,function(window, document){

	var isLocalTest = 0;

	var defaultCfg = {
		root: 'https://raw.githubusercontent.com/tasjs/tas/master/',
		time: 1000
	};

	var localCfg = {
		root: '/mynodejs/tas/',
		time: 0
	};

	var config = (isLocalTest ? localCfg : defaultCfg);

	typeof window === 'object' && typeof define !== 'function' &&
	typeof exports !== 'object' && (window.config = config);

	return config;
}));
