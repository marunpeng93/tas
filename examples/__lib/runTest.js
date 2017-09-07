/**
 * Tester of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('runTest', function(){

	var runTest = {
		do: function(test, repeatTimes, interval){
			test();
			repeatTimes && runTest.repeat(test, repeatTimes, interval);
		},

		repeat: function(test, repeatTimes, interval){
			interval = interval || 10; // seconds

			var count = 0;
			var hdl = setInterval(function(){

				test();

				count ++;
				if (count === repeatTimes) {
					clearTimeout(hdl);
				}

			}, interval * 1000);
		}
	};

	return (runTest);
});
