/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./await'),
	require('./next')
)})

(function(await, next){

	var async = {
		await: function(args){
			await.init(args);
		},

		next: function(args){
			next.do(args);
		}
	};

	module.exports = (async);
});