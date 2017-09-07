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

	all: function(obj, obj2){
		var isBegin = obj === 'begin';
		obj === 'begin' && (obj = obj2);

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

		obj = util.convert(obj, This);
		Tas.await.apply(null, isBegin ? ['begin', obj] : [obj]);
	}
};

module.exports.__proto__ = promiseAll;
