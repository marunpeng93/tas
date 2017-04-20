/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// Thanks David Calhoun: http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function(r,f){if(typeof process==='object'&&process.title.indexOf("node")>=0){module.exports=f(r);return;}if(typeof define==='function'&&define.amd){define(function(){return f(r,r.document)});return}if(typeof exports==='object'){module.exports=r.document?f(r,r.document):function(w){return f(w,w.document)};return}f(r,r.document)}(typeof window!=="undefined"?window:this,function(window, document){

	var isLocalTest = 0;

	var defaultCfg = {
		res: [
			'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json',
			'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/b.json',
			'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/c.json'
		],
		waitTime: 1000,
		netTimeout: 3*60*1000
	};

	var localCfg = {
		res: [
			'/mynodejs/tas/examples/__res/pics/a.json',
			'/mynodejs/tas/examples/__res/pics/b.json',
			'/mynodejs/tas/examples/__res/pics/c.json'
		],
		waitTime: 1000,
		netTimeout: 3*60*1000
	};

	var config = isLocalTest ? localCfg : defaultCfg;

	typeof window === 'object' && typeof define !== 'function' &&
	typeof exports !== 'object' && (window.config = config);

	return config;
}));
