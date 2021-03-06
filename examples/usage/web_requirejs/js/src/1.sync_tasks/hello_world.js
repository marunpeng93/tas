/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a = 0;

	tas(function(){
		a ++; // 1
	});

	tas({
		t1: function(){
			a ++; // 2
		},

		t2: {
			t3: function(){
				a ++; // 3
			},

			t4: function(){
				a ++; // 4
			}
		},

		t5: function(){
			a ++; // 5
		}
	});

	return {
		get: function(){
			return a; // 5
		}
	};
});