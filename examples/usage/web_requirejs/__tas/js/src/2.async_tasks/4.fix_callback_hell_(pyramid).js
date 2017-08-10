/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../util', '../../../../../../__lib/superagent'],
function(tas, util, superagent){

	var log = util.log;
	var request = superagent;
	var a = 0;

	//--------------------------------------------
	// A simple example of callback hell, thanks Scott Robinson:
	// http://stackabuse.com/avoiding-callback-hell-in-node-js/
	//--------------------------------------------

	//getData(function(a){
	//	getMoreData(a, function(b){
	//		getMoreData(b, function(c){
	//			getMoreData(c, function(d){
	//				getMoreData(d, function(e){
	//						...
	//				});
	//			});
	//		});
	//	});
	//});
	//--------------------------------------------

	// Let's use Tas to fix it.
	tas.await({
		t1: function(){
			a ++; // 1
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';
			request.get(url).end(tas.next);
		},

		t2: function(err, data){
			a ++; // 2
			if (err) return tas.break(err);
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/b.json';
			request.get(url).end(tas.next);
		},

		t3: function(err, data){
			a ++; // 3
			if (err) return tas.break(err);
			var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/c.json';
			request.get(url).end(tas.next);
		},

		t4: function(err, data){
			tas.next();
		}
	});

	tas(function(){
		log(a); // 3
	});

	return {
		get: function(){
			return a; // 3
		}
	};
});