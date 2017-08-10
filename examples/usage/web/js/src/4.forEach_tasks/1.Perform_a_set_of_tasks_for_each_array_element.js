/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var useTasForEach = function() {

	var request = superagent;
	var log = util.log;

	var a = 0;
	var record;

	tas.promise(function () {
		var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/array.json';
		request.get(url).end(this.done);
	});

	tas(function (err, data) {

		// Put the data to an array
		var arr = JSON.parse(data.text).data;

		// Pass the array to the next tasks
		return [arr];
	});

	// Use tas.forEach() to perform a set of tasks for each array element
	tas.forEach({

		// Receive the current element via init(), important!
		init: function (element) {

			// Save the element to local variable
			record = element;
		},

		// Apply the element
		doSomething: function () {
			log(record);
		},

		calc: function () {
			a++; // 2 times.
		}
	});

	tas(function () {
		a++; // 3
	});

	return {
		get: function () {
			return a; // 3
		}
	};

}();
