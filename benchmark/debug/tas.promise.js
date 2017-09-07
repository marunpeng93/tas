'use strict';

var tas = require('tas');
var run = require('oyo/run');

var isDebug = 1;
var tester = function(done, count){

	isDebug && console.log(0);

	tas.promise(function(){
		isDebug && console.log(1);

		process.nextTick(function(){
			isDebug && console.log(2);

			tas.resolve();
		});
	});

	tas(function(err, data){
		isDebug && console.log(3, count);
		done(count);
	});
};

run(tester, isDebug);
