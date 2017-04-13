
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./return_break');

tas(function(){
    var exp = 2;
    var val = runner.get();
    test("break the flow: return break", tas, exp, val);
});
