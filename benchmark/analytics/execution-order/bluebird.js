'use strict';

var bluebird = require('bluebird');
var run = require('oyo/run');

var isDebug = 1;
var tester = function(done, count){

	console.log(0);

	new bluebird(function (resolve, reject) {
		console.log(1);

		process.nextTick(function () {
			console.log(2);

			resolve();
		});
	}).then(function (data) {
		console.log(3);

	}).then(function (data) {
		console.log(4);

		done(count);
	});
};

run(tester, isDebug);
