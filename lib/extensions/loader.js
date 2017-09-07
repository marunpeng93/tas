/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var Tas;

var loader = {
	init: function(Tas_){
		Tas = Tas_;
	},

	load: function(names){
		names.length === 1 ?
			loader.loadExtension(names[0]) :
				loader.loadExtensions(names);
	},

	loadExtensions: function(names){
		names.forEach(function(name){
			loader.loadExtension(name);
		});
	},

	loadExtension: function(name){
		require('./' + name).init(Tas);
	}
};

module.exports.__proto__ = loader;
