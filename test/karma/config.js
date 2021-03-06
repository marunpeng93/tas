/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('config', function(){

	var config = {
		res: {
			a: './examples/__res/pics/a.json',
			b: './examples/__res/pics/b.json',
			c: './examples/__res/pics/c.json',
			array: './examples/__res/array.json'
		},
		
		waitTime: 0,
		netTimeout: 60*1000
	};

	return (config);
});
