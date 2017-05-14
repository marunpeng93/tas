/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasForEach = function() {
	var request = superagent;
	var a = 0;

	tas.promise(function () {
		var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/array.json';
		request.get(url).end(this.done);
	});

	tas(function (err, data) {
		var arr = JSON.parse(data.text).data;
		return [arr];
	});

	tas.forEach({
		init: function(element){
			//console.log(element);
		},

		async: function(){
			setTimeout(function(){
				a ++; // 2 times.
				tas.next();
			}, 200);
			return "await";
		},

		calc: function(){
			a ++; // 2 times.
		},

		async2: function(){
			setTimeout(function(){
				a ++; // 2 times.
				tas.next();
			}, 200);
			return "await";
		},

		calc2: function(){
			a ++; // 2 times.
		}
	});

	tas(function () {
		a ++; // 9
	});

	return {
		get: function () {
			return a; // 9
		}
	};

}();
