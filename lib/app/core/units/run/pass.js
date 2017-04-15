/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../../../../my/array')
)})

(function(array){

	var pass = Object.create(array);

	// Alias
	pass.saveArguments = pass.set;
	pass.getArguments = pass.get;

	module.exports = (pass);
});