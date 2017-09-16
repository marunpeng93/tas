/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas'],
function(tas){

	var a = 1;

	tas({
		t1: function(){
			a ++; // 2
		},

		t2: function(){
			a ++; // 3

			setTimeout(function(){
				a ++; // 4

				// Pass a parameter
				tas.next(1);
			}, 0);

			return "await";
		},

		t3: function(a0){
			a += a0; // 5

			setTimeout(function(){

				// Pass multiple parameters
				tas.next(2, 3, 4);
			}, 0);

			return "await";
		}
	});

	tas.await({
		t1: function (a0, a1, a2){
			a += a0; // 7
			a += a1; // 10
			a += a2; // 14

			setTimeout(function(){
				var arr = [1, 2, 3];

				// Pass an array parameter.
				tas.next(arr);
			}, 0);
		},

		t2: function (arr){
			arr.forEach(function(e){
				a += e;
			});

			setTimeout(function(){

				// Pass nothing, just go to the next task.
				tas.next();
			}, 0);
		}
	});

	return {
		get: function(){
			return a; // 20
		}
	};
});