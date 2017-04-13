
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./2.use_tas.all()_as_promise.all()');

tas(function(){
    var exp = 'object';
    var val = typeof runner.get();
    test("as promise: use tas.all() as promise.all()", tas, exp, val);
});
