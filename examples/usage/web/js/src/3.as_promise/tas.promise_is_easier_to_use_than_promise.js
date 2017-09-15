/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasPromiseIsEasierToUseThanPromise = function(){

	var request = superagent;
	var dat;

	// 'Cause we need to abort when an error occurred, we must use tas.begin() at the first. See details:
	// https://github.com/tasjs/tas/blob/master/benchmark/analytics/concurrency-order/__readme.md
	tas.begin();

	tas.promise(function(){
		var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';
		request.get(url).end(function(err, data){
			if (err) return tas.abort(err);
			tas.resolve(data);
		});
	});

	tas(function(data){
		dat = data;
	});

	return {
		get: function(){
			return dat;
		}
	};

}();