
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./4.via_tas');

tas(function(){
	var exp = 7;
	var val = runner.get();
	test("pass the data: via tas", tas, exp, val);
});
