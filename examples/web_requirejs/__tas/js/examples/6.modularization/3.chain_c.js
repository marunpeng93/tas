/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', './3.chain_b'],
function(tas, moduleChainB){

	var mb = moduleChainB;
	var a;

	tas.await(function(){
		a = 3 + mb.get(); // 10

		setTimeout(function(){
			a ++; // 11
			tas.next();
		}, 300);
	});

	tas(function(){
		a ++; // 12
	})

	return {
		get: function(){
			return a; // 12
		}
	};
});