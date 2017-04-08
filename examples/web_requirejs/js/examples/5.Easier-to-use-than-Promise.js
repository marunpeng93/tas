/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// The utils is only used for this example, not part of Tas.
define(['../../../../dist/tas.min', '../../../../examples/utils'], function(tas, utils){
	var title = utils.title, log = utils.log, logs = utils.logs, tree = utils.tree;

	tas(function(){
		title('5. Easier to use than Promise');
	});

	//--------------------------------------------
	// The tasks written by Tas do not need to use Promise / resolve / reject,
	// generator / yield, async / await, so Tas is easier to use than Promise.
	//--------------------------------------------

	// Simulate an ajax object.
	var ajax = {
		get: function (url, callback) {
			log('Ajax get url %s.', url);
			log('Wait 1 second...');
			log();

			// Simulate time-consuming operation.
			setTimeout(function(){

				// Execute the callback function and pass the arguments to it.
				log('Do callback with arguments 1, 2, 3.');
				callback(null, [1, 2, 3]);

			}, 1000);
		}
	};

	//--------------------------------------------
	// A simple Promise
	//--------------------------------------------
	tas.promise(function(){
		ajax.get('http://a.com/1.json', this.done);
	});

	//--------------------------------------------
	// Handle the data
	//--------------------------------------------
	tas(function (err, data) {
		if (err) {
			log(err);
		}
		else {
			log(data);
			log();
		}

		// Passing the data to the next function or tasks.
		return [err, data];
	});

	//--------------------------------------------
	// Continue to handle the data
	//--------------------------------------------
	tas({
		t1: function (err, data) {
			if (err) {
				log(err);
			}
			else {
				log('Continue to handle the data.');
				log(data.map(function(v){return v + 1}));
				log();
			}
		},

		t2: function(){
			log('Done\n');
		}
	});
});
