/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib');
var a = 1;

tas({
	t1: function(){
		return 2;
	},

	t2: function(arg){
		a += arg; // 3
		return [4, 5];
	}
});

tas({
	t3: {
		t4: function(a0, a1){
			a += a0; // 7
			a += a1; // 12
			return [];
		},

		t5: {
			t6: function(a0){
				if (typeof a0 !== 'undefined') {
					a ++;
				}

				return [1, 2, 3];
			},

			t7: function(a0, a1, a2){
				a += a0; // 13
				a += a1; // 15
				a += a2; // 18

				var arr = [1, 2, 3];
				return [arr];
			}
		}
	}
});

tas(function(arr){
	arr.forEach(function(e){
		a += e;
	});
});


module.exports = {
	get: function(){
		return a; // 24
	}
};
