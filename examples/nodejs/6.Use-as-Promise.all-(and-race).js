/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../../lib'),
	require('../utils').title,
	require('../utils').log,
	require('../utils').logs,
	require('../utils').tree
)})

(function (tas, title, log, logs, tree) {

	tas(function(){
		title('6. Use as Promise.all and Promise.race');
	});

	//--------------------------------------------
	// Simulate an ajax object
	//--------------------------------------------

	var ajax = {
		getData: function (url, callback) {
			var timeout = ajax.getRand();
			log('Fetch data from url "%s", wait %s second(s)...', url, timeout);

			setTimeout(function () {
				var err = null;
				var data = [ajax.getRandInt(), ajax.getRandInt(), ajax.getRandInt()];
				callback(err, {timeout: timeout, url: url, data: data});
			}, timeout * 1000);
		},

		getRand: function(){
			return (Math.random() * 3).toFixed(1);
		},

		getRandInt: function(){
			return (Math.random() * 100).toFixed();
		}
	};

	//--------------------------------------------
	// As Promise.all()
	//--------------------------------------------

	// Perform all tasks at the same time. After all the tasks have been completed, continue.
	// Therefore, the total waiting time is the longest task time.
	tas.all({
		t1: function () {
			// Use this.done() as a callback function and receive data.
			var url = "http://github.com/hiowenluke/tas/examples/1";
			ajax.getData(url, this.done);
		},

		t2: function () {
			var url = "http://github.com/hiowenluke/tas/examples/2";
			ajax.getData(url, this.done);
		},

		t3: function () {
			var url = "http://github.com/hiowenluke/tas/examples/3";
			ajax.getData(url, this.done);
		}
	});

	// After all the tasks in tas.all(..) have been completed,
	// continue to handle the tasks here.
	tas(function (err, data) {
		if (err) {
			log(err);
		}
		else {
			log();
			log('Result(s):');

			// Get data from tas.all(..), cool!
			// Data is an array that holds the data for all tasks,
			// so each data element is fetched one by one.
			data.forEach(function (d) {
				log('Time:  %s second(s)', d.timeout);
				log('Url:  ', d.url);
				log('Data: ', d.data);
			});
		}

		log();
		log('----------------------------------------');
	});

	//--------------------------------------------
	// As Promise.race()
	//--------------------------------------------

	// Perform all tasks at the same time.
	// As long as one of tasks is completed, continue.

	// Note:
	// The total waiting time here is the longest task time
	// because the other tasks are not canceled.

	// If you want to cancel other tasks that have not yet been completed,
	// see "7.Use-as-cancelable-Promise.race.js" for more details.

	tas.race({
		t1: function () {
			var url = "http://github.com/hiowenluke/tas/examples/1";
			ajax.getData(url, this.done);
		},

		t2: function () {
			var url = "http://github.com/hiowenluke/tas/examples/2";
			ajax.getData(url, this.done);
		},

		t3: function () {
			var url = "http://github.com/hiowenluke/tas/examples/3";
			ajax.getData(url, this.done);
		}
	});

	// When one of tasks in tas.race(..) is completed,
	// continue to deal with this task.
	tas(function (err, data) {
		if (err) {
			log(err);
		}
		else {
			// Get data from tas.race(..), cool!

			// Note:
			// You can only get the arguments passed
			// by the first completed task.
			log();
			log('Winner:');
			log('Time:  %s second(s)', data.timeout);
			log('Url:  ', data.url);
			log('Data: ', data.data);
		}

		log();
	});

	tas(function(){
		log('Done\n');
	});
});