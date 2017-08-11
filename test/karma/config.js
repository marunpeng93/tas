/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('config', function(){

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

	return (config);
});
