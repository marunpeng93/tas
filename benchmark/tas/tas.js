'use strict';

var tas = require('../../lib');
var run = require('oyo/run');

var tester = function(done, count){

	tas(function(){
		return 1;
	});

	tas(function(data){
		done(count);
	});
};

run(tester);
