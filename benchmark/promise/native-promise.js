'use strict';

var run = require('oyo/run');
var tester = function(done, count){

	new Promise(function (resolve, reject) {
		process.nextTick(function () {
			resolve();
		});
	}).then(function (data) {
		done(count);
	});
};

run(tester);
