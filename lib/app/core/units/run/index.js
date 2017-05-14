/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./pass'),
	require('./flag'),
	require('../status'),
	require('../../tasks/data/layer')
)})

(function(pass, flag, status, layer){

	var run = {
		do: function(func){

			status.maxLayer.set(layer.get());
			layer.add();

			// Bind the current tasks object to "this".
			var result = func.apply(func.root, pass.getArguments());

			// If the result is an Array, save it
			// to pass to the next function or tasks.
			if (result instanceof Array) {
				pass.saveArguments(result);
			}
			else if (typeof result === 'string'){
				flag.save(result);
			}

			layer.sub();
			return result;
		}
	};

	module.exports = (run);
});
