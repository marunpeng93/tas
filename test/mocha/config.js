/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('config', function(){

	var isLocalTest = 0;

	var defaultCfg = {
		res: {
			a: 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json',
			b: 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/b.json',
			c: 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/c.json',
			array: 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/array.json'
		},

		waitTime: 10,
		netTimeout: 3*60*1000
	};

	var localCfg = {
		res: {
			a: '/mynodejs/tas/examples/__res/pics/a.json',
			b: '/mynodejs/tas/examples/__res/pics/b.json',
			c: '/mynodejs/tas/examples/__res/pics/c.json',
			array: '/mynodejs/tas/examples/__res/array.json'
		},
		
		waitTime: 10,
		netTimeout: 3*60*1000
	};

	var config = isLocalTest ? localCfg : defaultCfg;

	return (config);
});
