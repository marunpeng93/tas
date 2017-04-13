
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./tas.await()');

tas(function(){
    var exp = 3;
    var val = runner.get();
    test("handle the async tasks: tas.await()", tas, exp, val);
});
