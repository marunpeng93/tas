
var tas = require('../../../lib');
var a = 1;

tas.await(function(){
	a ++; // 2

	setTimeout(function(){
		a ++; // 3

		tas.next();
	}, 500);
});

tas({
	t1: function(){
		a ++; // 4
	},

	t2: function(){
		a ++; // 5

		setTimeout(function(){
			a ++; // 6

			tas.next();
		}, 500);

		return "await";
	},

	t3: function(){
		a ++; // 7
	}
});

tas.await(function(){
	a ++; // 8

	setTimeout(function(){
		a ++; // 9

		tas.next();
	}, 500);
});

tas(function(){
	a ++; // 10
});

module.exports = {
    get: function(){
        return a; // 10
    }
};
