/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var Tas;
var data = require('./../core/data');
var util = require('./promise~util.js');

var promiseAll = {
	init: function(Tas_){
		Tas = Tas_;
		Tas.all = this.all;
		data.extensions.isPromiseAllEnabled = true;
	},

	unload: function(){
		data.extensions.isPromiseAllEnabled = false;
		Tas.all = null;
	},

	all: function(obj){
		var times = Object.keys(obj).length;
		var count = 0;
		var allData = [];

		var This = {
			done: function(err, data){
				count ++;
				allData.push(data);

				if (err || count === times) {
					Tas.resolve(err, allData);
				}
			},

			abort: function(){
				Tas.abort();
				this.done('abort');
			}
		};

		Tas.await(util.convert(obj, This));
	}
};

module.exports.__proto__ = promiseAll;
