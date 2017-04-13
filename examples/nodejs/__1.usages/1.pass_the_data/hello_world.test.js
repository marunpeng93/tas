
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./via_return');

tas(function(){
	var exp = 15;
	var val = runner.get();
	test("pass the data: via return", tas, exp, val);
});
