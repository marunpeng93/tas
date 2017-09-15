/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var request = require('superagent');
var dat;

// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
tas.begin();

tas.promise(function(){
	var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';
	request.get(url).end(tas.resolve);
});

tas(function(err, data){

	// Handle the error, or just abort.
	if (err) return tas.abort(err);

	// Save data.
	dat = data;

	// Pass the data to the next task if needed.
	return [err, data];
});

tas(function(err, data){
	// Do something.
});

module.exports = {
	get: function(){
		return dat;
	}
};
