/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('./forEach'),
	require('./forEachDo')
)})

(function(forEach, forEachDo){

	var array = {
		forEach: function(args){
			forEach.init(args);
		},

		continue: function(){
			forEachDo.continue();
		}
	};

	module.exports = (array);
});
