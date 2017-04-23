/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// Thanks David Calhoun: http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function(r,f){if(typeof process==='object'&&process.title.indexOf("node")>=0){module.exports=f(r);return;}if(typeof define==='function'&&define.amd){define(function(){return f(r,r.document)});return}if(typeof exports==='object'){module.exports=r.document?f(r,r.document):function(w){return f(w,w.document)};return}f(r,r.document)}(typeof window!=="undefined"?window:this,function(window, document){

	var config = {

		// root path:
		// http://localhost:9876/
		res: {
			a: '/socket.io/socket.io.js',
			b: '/karma.js',
			c: '/debug.html',
			array: '/'
		},

		waitTime: 0,
		netTimeout: 1000,
		isKarma: true
	};

	typeof window === 'object' && typeof define !== 'function' &&
	typeof exports !== 'object' && (window.config = config);

	return config;
}));
