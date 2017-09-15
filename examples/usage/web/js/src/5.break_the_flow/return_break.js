/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var returnBreak = function(){

	var a  = 1;

	tas({
		t1: function(){

			// The remaining task(s) in the current tasks will be ignored.
			return 'break';
		},

		t2: function(){
			a ++; // ignored
		}
	});

	tas(function(){
		a ++; // 2
	});

	return {
		get: function(){
			return a; // 2
		}
	};

}();