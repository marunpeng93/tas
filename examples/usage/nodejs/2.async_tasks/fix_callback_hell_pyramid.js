/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../tas');
var log = require('../../../__lib/util').log;
var a = 0;

// The tas.await() and tas() without indent is not part of
// this example, just use it to separate multiple examples.
tas.await(function(){

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

	var request = require('superagent');

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
});

tas.await(function(){

	//--------------------------------------------
	// An example of callback hell in NodeJS, thanks Scott Robinson:
	// http://stackabuse.com/avoiding-callback-hell-in-node-js/
	//--------------------------------------------

	//var fs = require("fs")
	//var myFile = "/tmp/test"
	//var txt = "An example of callback hell in NodeJS."
	//
	//fs.writeFile(myFile, txt, function(err) {
	//	if(err) {
	//		return console.log(err);
	//	}
	//
	//	fs.readFile(myFile, "utf8", function(err, txt) {
	//		if(err) {
	//			return console.log(err);
	//		}
	//
	//		txt = txt + "\\nAppended something!";
	//		fs.writeFile(myFile, txt, function(err) {
	//			if(err) {
	//				return console.log(err);
	//			}
	//
	//			console.log("Appended text!");
	//		});
	//	});
	//});
	//--------------------------------------------
	
	// Let's use Tas to fix it, again.
	var fs = require('fs');
	var file = '/tmp/test';
	var text = 'Using Tas to fix callback hell.';

	tas.await({

		init: function(){
			a ++; // 4
			fs.writeFile(file, text, function (err) {
				if (err) return tas.break(err);
				tas.next();
			});
		},

		readFile: function () {
			a ++; // 5
			fs.readFile(file, 'utf8', function (err, txt) {
				if (err) return tas.break(err);
				text = txt;
				tas.next();
			});
		},

		setText: function () {
			a ++; // 6
			text += '\nAppended something.';
			tas.next();
		},

		writeFile: function () {
			a ++; // 7
			fs.writeFile(file, text, function (err) {
				if (err) return tas.break(err);
				tas.next();
			});
		}
	});

	tas(function(){
		log(a); // 7
	});
});

module.exports = {
	get: function(){
		return a; // 7
	}
};
