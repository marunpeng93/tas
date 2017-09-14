/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var Tas;
var flag = require('../core/flag');
var util = require('./promise~util.js');

var promiseRace = {
	init: function(Tas_){
		Tas = Tas_;
		Tas.race = this.race;
		Tas.cancel = this.cancel;
	},

	race: function(obj){
		var count = 0;
		var This = {
			done: function(err, data){
				if (++ count === 1) {
					Tas.resolve(err, data);
				}
			},

			abort: function(){
				flag.setIsAwait(false);
				Tas.abort();
			}
		};

		Tas.await(util.convert(obj, This));
	},

	cancel: function(handlers){

		/* istanbul ignore next */
		if (!handlers || !(handlers instanceof Array)) return;

		handlers.forEach(function(handle){

			/* istanbul ignore next */
			if (handle.abort) {

				// For web
				if (typeof XMLHttpRequest !== 'undefined' && handle instanceof XMLHttpRequest) {
					if (handle.readyState !== XMLHttpRequest.UNSENT) {
						handle.abort();
					}
				}
				else {
					// The ajax or request object has abort() method, such as
					// Superagent (one of Node.js third-party modules).
					handle.abort();
				}
			}
			else {
				// Valid for NodeJS and web.
				clearTimeout(handle);
			}
		});
	}
};

module.exports.__proto__ = promiseRace;
