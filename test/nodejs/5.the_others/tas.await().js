
var tas = require('../../../lib');
var a = 0;

tas.await(function(){
	a ++; // 1

	setTimeout(function(){
		a ++; // 2
		tas.next();
	}, 500);
});

tas(function(){
	a ++; // 3
});

module.exports = {
    get: function(){
        return a;
    }
};
