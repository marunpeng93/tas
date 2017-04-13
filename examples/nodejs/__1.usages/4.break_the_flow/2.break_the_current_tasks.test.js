
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./1.ignore_the_current_functions');

tas(function(){
	var exp = 2;
	var val = runner.get();
	test("pass the data: via return", tas, exp, val);
});
