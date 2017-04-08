/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function (tas, title, log, logs, tree) {

	tas(function(){
		title('7. Use as cancelable Promise.race');
	});

	// The tas.await() and tas() in this indent level is not part of
	// the example, just use it to distinguish multiple examples.
	tas.await(function(){

		//--------------------------------------------
		// 1. Cancel the other XMLHttpRequest tasks when tas.race() is done.
		//--------------------------------------------

		if (typeof XMLHttpRequest === 'undefined') {
			// Use return false or return "break" to break the current tasks.
			return false;
		}

		log("An example for canceling XMLHttpRequest tasks.\n");

		// Define handlers, and save all the asynchronous task handler.
		// When tas.race (..) is finished, Tas will follow the following rules to
		// cancel the handlers array that has not yet completed the task:

		// 		1. If there is a handlers.do () method, execute it.
		// 		2. If there are other custom methods of handlers, execute the first one.
		// 		3. If none of the above is met, the elements in the handlers are handled by default:

		// 			A. If it is an instance of XMLHttpRequest, use the abort () method
		// 			B. Otherwise see handler for setTimeout, use the clearTimeout () method

		// Perform the following three steps (notice the serial number):
		// 1. Define handlers, and save all asynchronous task handler.
		var handlers = [];


		// The following handlers.do() method can be omitted because Tas already has these methods.
		// Only when you need to do an extra operation, will you need to customize handlers.do().

		// Cancel XMLHttpRequest
		// handlers.do = function(){
		//	 handlers.forEach(function(req){
		//		if (req.readyState !== XMLHttpRequest.UNSENT) {
		//			req.abort();
		//		}
		//	 });
		// }

		// Cancel setTimeout
		// handlers.do = function(){
		//	 handlers.forEach(function(handler){
		//		clearTimeout(handler);
		//   });
		// }

		var ajax = {
			getData: function (url, callback) {
				log('Receive data from url .../%s', url.slice(url.lastIndexOf('/') + 1));

				var req = new XMLHttpRequest();

				// 2. Save the XMLHttpRequest instance to the handlers array.
				handlers.push(req);

				req.open('GET', url, true);
				req.onload = function () {
					if (req.status === 200) {

						// 3. Pass handlers to callback.
						callback(null, {url: url, text: req.responseText}, handlers);
					} else {
						callback(new Error(req.statusText));
					}
				}

				req.onerror = function () {
					callback(new Error(req.statusText));
				};

				req.onabort = function () {
					callback(new Error('Abort this request.'));
				};

				req.send();
			}
		};

		// Now, when an XMLHttpRequest task is finished,
		// the other unfinished XMLHttpRequest task will be canceled.
		// Therefore, the total waiting time is also the shortest task time.
		tas.race({
			t1: function () {
				var url = "https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js";
				ajax.getData(url, this.done);
			},

			t2: function () {
				var url = "https://raw.githubusercontent.com/angular/angular.js/master/src/Angular.js";
				ajax.getData(url, this.done);
			},

			t3: function () {
				var url = "https://d3js.org/d3.v4.js";
				ajax.getData(url, this.done);
			}
		});

		// When one of tasks in tas.race() is completed,
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
				log('Url:   .../%s', data.url.slice(data.url.lastIndexOf('/') + 1));
				log('Data:  %d KB', data.text.length / 1024);
				log();
				log('The other XMLHttpRequest tasks have been canceled.');
			}

			log();
			log('----------------------------------------');
			log();
		});
	});


	tas.await(function (){

		//--------------------------------------------
		// 2. Cancel the other setTimeout tasks when tas.race() is done.
		//--------------------------------------------

		log("An example for canceling setTimeout tasks.\n");

		// Perform the following three steps (notice the serial number):
		// 1. Define handlers, and save all asynchronous task handler.
		var handlers = [];

		var ajax = {
			getData: function(url, callback){
				var timeout = ajax.getRand();
				var shortUrl = url.slice(url.lastIndexOf('/') + 1);
				log('Receive data from url .../%s, wait %s second(s)...', shortUrl, timeout);

				// 2. Get the handler of timer.
				var hdl = setTimeout(function(){
					var err = null;
					var data = [ajax.getRandInt(), ajax.getRandInt(), ajax.getRandInt()];

					// 4. Pass handlers to callback.
					callback(err, {timeout: timeout, url: url, data: data}, handlers);
				}, timeout * 1000);

				// 3. Save the hander to the handlers array.
				handlers.push(hdl);
			},

			getRand: function(){
				return (Math.random() * 3).toFixed(1);
			},

			getRandInt: function(){
				return (Math.random() * 100).toFixed();
			}
		};

		// Now, when a timer task is finished,
		// the other unfinished timer task will be canceled.
		// Therefore, the total waiting time is also the shortest task time.
		tas.race({
			t1: function(){
				var url = "http://github.com/hiowenluke/tas/examples/1";
				ajax.getData(url, this.done);
			},

			t2: function(){
				var url = "http://github.com/hiowenluke/tas/examples/2";
				ajax.getData(url, this.done);
			},

			t3: function(){
				var url = "http://github.com/hiowenluke/tas/examples/3";
				ajax.getData(url, this.done);
			}
		});

		// When one of tasks in tas.race() is completed,
		// continue to deal with this task.
		tas(function(err, data){
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
				log('Url:   .../%s', data.url.slice(data.url.lastIndexOf('/') + 1));
				log('Data: ', data.data);
				log();
				log('The other setTimeout tasks have been canceled.');
			}

			log();
		});

		tas(function(){
			log('Done\n');
		});
	});

// The util is only used for this example, not part of Tas.
})(tas, util.title, util.log, util.logs, util.tree);
