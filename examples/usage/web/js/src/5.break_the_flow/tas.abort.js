/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasAbort = function(){

	var a = 1;

	// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
	// https://github.com/tasjs/tas/blob/master/doc/execution-order/concurrency-order.md
	tas.begin();

	tas({
		t1: function () {
			a ++;
		},

		t2: function(){
			[1].forEach(function(){

				// Abort Tas, then the remaining tasks will be ignored.
				tas.abort();
			});
		}
	});

	tas(function(){ // ignored
		a ++;
	});

	return {
		get: function(){
			return a;
		}
	};

}();
