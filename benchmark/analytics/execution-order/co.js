'use strict';

var co = require('co');
var run = require('oyo/run');

var isDebug = 1;
var tester = function(done, count){

	console.log(0);

	co(function* () {
		console.log(1);

		var result = yield Promise.resolve(true);
		console.log(2);

		return result;
	}).then(function (data) {
		console.log(3);

	}).then(function (data) {
		console.log(4);
		done(count);
	});
};

run(tester, isDebug);
