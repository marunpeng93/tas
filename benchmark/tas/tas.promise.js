'use strict';

var tas = require('../../lib');
var run = require('oyo/run');

var tester = function(done, count){

	tas.promise(function(){
		process.nextTick(function(){
			tas.resolve();
		});
	});

	tas(function(err, data){
		done(count);
	});
};

run(tester);
