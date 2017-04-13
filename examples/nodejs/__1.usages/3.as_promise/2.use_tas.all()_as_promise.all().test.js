
var tas = require('../../../../lib');
var test = require('../../../util').test;
var runner = require('./1.easier_to_use_than_promise');

tas(function(){
    var exp = 'object';
    var val = typeof runner.get();
    test("as promise: easier to use than promise", tas, exp, val);
});
