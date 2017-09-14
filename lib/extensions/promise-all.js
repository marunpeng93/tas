/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var Tas;
var util = require('./promise~util.js');

var promiseAll = {
	init: function(Tas_){
		Tas = Tas_;
		Tas.all = this.all;
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
				debugger;
				Tas.abort();
				this.done('abort');
			}
		};

		Tas.await(util.convert(obj, This));
	}
};

module.exports.__proto__ = promiseAll;
