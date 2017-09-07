'use strict';

var bluebird = require('bluebird');
var run = require('oyo/run');

var tester = function(done, count){

	new bluebird(function (resolve, reject) {
		process.nextTick(function () {
			resolve();
		});
	}).then(function (data) {
		done(count);
	});
};

run(tester);
