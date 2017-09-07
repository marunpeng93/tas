'use strict';

var tas = require('../../lib');
var run = require('oyo/run');

var tester = function(done, count){

	tas.await(function() {
		process.nextTick(function () {
			tas.next();
		});
	});

	tas(function (err, data) {
		done(count);
	});
};

run(tester);
