
var tas = require('../../../lib');
tas.await(function(){

    var a = 1;

    tas.await({
        t1: function(){
            setTimeout(function(){
                a ++;
                tas.next();
            }, 1000);
        }
    });

    tas(function(){
        tas.a = a;
    });
});

module.exports = {
    get: function(){
        return tas.a;
    }
};
