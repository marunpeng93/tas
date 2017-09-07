/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('tester', function(){

	var tester = {
		do: function (test, done, times) {
			times = times || 2;

			var count = 0;
			var results = [];

			while (count < times) {
				count ++;

				(function(count){
					test(testDone, count);
				})(count);
			}

			function testDone(count, result){
				results[count - 1] = result;

				if (count === times) {
					done(results);
				}
			}
		}
	};

	return (tester);
});
