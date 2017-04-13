
var tas = require('../../../lib');
var runner = require('./tas.await()');

tas(function(){
    console.log('-- handle the async tasks: tas.await()');
    console.log(runner.get()); // 2
    console.log();
});
