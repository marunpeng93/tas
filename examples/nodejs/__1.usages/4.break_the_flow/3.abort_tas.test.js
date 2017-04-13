
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./2.break_the_current_tasks');

tas(function(){
	var exp = 2;
	var val = runner.get();
	test("pass the data: via return", tas, exp, val);
});
