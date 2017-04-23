/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasForEach = function() {
	var request = superagent;
	var a = 0;

	tas.promise(function () {
		var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/array.json';
		request.get(url).end(this.done);
	});

	tas(function (err, data) {
		var arr = JSON.parse(data.text).data;
		return [arr];
	});

	tas.forEach({
		init: function (element) {
			//console.log(element);
		},

		calc: function () {
			a ++; // 2 times.
		}
	});

	tas(function () {
		a ++; // 3
	});

	return {
		get: function () {
			return a; // 3
		}
	};

}();