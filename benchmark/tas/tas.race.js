'use strict';

var tas = require('../../lib').load('promise-race');
var run = require('oyo/run');

var tester = function(done, count){

	tas.race({
		t1: function(){
			process.nextTick(this.done);
		}
	});

	tas(function(err, data){
		done(count);
	});
};

run(tester);
