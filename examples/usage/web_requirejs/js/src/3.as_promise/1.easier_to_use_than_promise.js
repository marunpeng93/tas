/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../superagent'],
function(tas, superagent){

	var request = superagent;
	var dat;

	// The tasks written by Tas do not need to use Promise / resolve / reject,
	// generator / yield, async / await, so Tas is easier to use than Promise.
	tas.promise(function(){

		// Use this.done() to pass the data
		var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';
		request.get(url).end(this.done);
	});

	tas(function(err, data){
		dat = data;

		// We can pass the data to the next function or tasks if needed.
		return [err, data];
	});

	tas(function(err, data){
		// Do something.
	});

	return {
		get: function(){
			return dat;
		}
	};
});