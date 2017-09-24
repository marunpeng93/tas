'use strict';

var tas = require('../../../lib');
var run = require('oyo/run')({isDebug: 1});

var tester = function(done, count){

	console.log(0);

	tas.promise(function(){
		console.log(1);

		process.nextTick(function(){
			console.log(2);

			tas.resolve();
		});
	});

	tas(function(err, data){
		console.log(3);
	});

	tas(function(){
		console.log(4);
		done(count);
	});
};

run(tester);
