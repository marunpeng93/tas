/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var abortTas = function(){

	var a  = 1;
	var x = 10; // Change the value of x to 0 or 1 to see the different result.

	tas({
		t1: function () {
			a ++;
		},

		t2: function () {
			if (x === 0) {

				// Use return "abort" to abort Tas.
				return "abort";
			}
		},

		t3: function(){
			if (x === 1) {
				[1].forEach(function(){

					// Use return "abort" to abort Tas in nested function(closure).
					tas.abort();
				});
			}
		}
	});

	tas(function(){
		a ++;
	});

	return {
		get: function(){
			return a;
		}
	};

}();
