'use strict';

var run = require('oyo/run')({isDebug: 1});

var tester = function(done, count){

	console.log(0);

	new Promise(function (resolve, reject) {
		console.log(1);

		process.nextTick(function () {
			console.log(2);

			resolve();
		});
	}).then(function (data) {
		console.log(3, count);
		done(count);

	});
};

run(tester);
