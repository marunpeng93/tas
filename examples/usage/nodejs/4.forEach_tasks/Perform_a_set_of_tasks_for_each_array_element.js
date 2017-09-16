/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// tas.race() is an extension of Tas, we need to load it at the first.
var tas = require('../tas').load('forEach');

var log = require('../../../__lib/util').log;
var request = require('superagent');
var a = 0;
var record;

// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
tas.begin();

tas.promise(function(){
	var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/array.json';
	request.get(url).end(tas.resolve);
});

tas(function(err, data){
	if (err) return tas.abort(err);

	// Put the data into an array
	var arr = JSON.parse(data.text).data;

	// Pass the array to the next tasks
	return [arr];
});

// Perform a set of tasks for each array element
tas.forEach({

	// Receive the current element via init(), important!
	init: function(element, index){

		// Save the element to local variable
		record = element;
	},

	// Apply the element
	doSomething: function(){
		log(record);
	},

	calc: function(){
		a ++; // 2 times.
	}
});

tas(function(){
	a ++; // 3
});

module.exports = {
	get: function(){
		return a; // 3
	}
};
