/**
 * Builder of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('path'),
	require('../package')
)})

(function(path, pkg){

	module.exports = {
		entry: '../main.js',
		output: {
			filename: pkg.name + '.js',
			path: path.resolve(__dirname, '../dist')
		}
	};
});
