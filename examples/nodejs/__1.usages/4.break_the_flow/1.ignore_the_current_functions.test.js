
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./2.via_return');

tas(function(){
	var exp = 81;
	var val = runner.get();
	test("pass the data: via return", tas, exp, val);
});
