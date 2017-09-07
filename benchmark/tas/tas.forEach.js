'use strict';

var tas = require('../../lib').load('forEach');
var run = require('oyo/run');

var tester = function(done, count){

	tas.await(function() {
		process.nextTick(function(){
			var data = [1];
			tas.next(data);
		});
	});

	tas.forEach({
		init: function(element, index){
			// console.log(element);
		},

		t1: function(){
			// do something
		}
	});

	tas(function(){
		done(count);
	});
};

run(tester);
