'use strict';

var co = require('co');
var run = require('oyo/run');

var tester = function(done, count){

	co(function* () {
		var result = yield Promise.resolve(true);
		return result;
	}).then(function (data) {
		done(count);
	});
};

run(tester);
