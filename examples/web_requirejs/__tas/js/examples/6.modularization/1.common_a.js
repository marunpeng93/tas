/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a  = 0;

	var calc = {
		add: function(num){
			return a + num;
		},

		sub: function(num){
			return a - num;
		}
	};

	tas.await(function(){
		a ++; // 1

		setTimeout(function(){
			a ++; // 2
			a = calc.add(2); // 4
			tas.next();
		}, 300);
	});

	tas(function(){
		a = calc.sub(3); // 1
	})

	return {
		get: function(){
			return a; // 1
		}
	};
});