/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// The util is only used for this example, not part of Tas.
define(['../../../../dist/tas.min', '../../../../examples/util'], function(tas, util){
	var title = util.title, log = util.log, logs = util.logs, tree = util.tree;

	tas(function(){
		title('4. Fix callback hell');
	});

	// Simulate an ajax object.
	var ajax = {
		getData: function(value, callback){
			value = typeof value === 'undefined' ? 1 : value + 1;
			log('Do callback with arguments %d.', value);

			setTimeout(function(){
				callback(value);
			}, 1000);
		}
	};

	// The tas.await() and tas() in this indent level is not part of
	// the example, just use it to distinguish multiple examples.
	tas.await(function(){

		//--------------------------------------------
		// A simple example of callback hell, thanks Scott Robinson:
		// http://stackabuse.com/avoiding-callback-hell-in-node-js/
		//--------------------------------------------

		logs(
			'// A simple example of callback hell',
			'',
			'getData(function(a){',
			'  getMoreData(a, function(b){',
			'    getMoreData(b, function(c){',
			'      getMoreData(c, function(d){',
			'        getMoreData(d, function(e){',
			'          ...',
			'        })',
			'      })',
			'    })',
			'  })',
			'})',
			'',
			'// Let\'s use Tas to fix it.'
		);

		// Let's use Tas to fix it.
		tas.await({
			t1: function(){
				ajax.getData(null, tas.next);
			},

			t2: function(a){
				ajax.getData(a, tas.next);
			},

			t3: function(b){
				ajax.getData(b, tas.next);
			},

			t4: function(c){
				ajax.getData(c, tas.next);
			},

			t5: function(d){
				ajax.getData(d, tas.next);
			},

			t6: function(e){
				log();
				tas.next();
			}
		});
	});


	tas.await(function(){

		//--------------------------------------------
		// An example of callback hell in NodeJS, thanks Scott Robinson:
		// http://stackabuse.com/avoiding-callback-hell-in-node-js/
		//--------------------------------------------

		if (!(typeof process === 'object' && process + '' === '[object process]')) {
			log('An example of callback hell in NodeJS.');
			log('Error: This example only run in NodeJS.');

			// Use return false or return "break" to break the current tasks.
			return false;
		}

		logs(
			'',
			'// An example of callback hell in NodeJS.',
			'',
			'var fs = require("fs")',
			'var myFile = "/tmp/test"',
			'var txt = "An example of callback hell in NodeJS."',
			'',
			'fs.writeFile(myFile, txt, function(err) {',
			'    if(err) {',
			'        return log(err)',
			'    }',
			'',
			'    fs.readFile(myFile, "utf8", function(err, txt) {',
			'        if(err) {',
			'            return log(err)',
			'        }',
			'',
			'        txt = txt + "\\nAppended something!"',
			'        fs.writeFile(myFile, txt, function(err) {',
			'            if(err) {',
			'                return log(err)',
			'            }',
			'',
			'            log("Appended text!")',
			'        })',
			'    })',
			'})',
			'',
			'// Let\'s use Tas to fix it, again.'
		);

		// Let's use Tas to fix it, again.
		tas.await({

			init: function(){
				log('init()');

				this.fs = require('fs');
				this.myFile = '/tmp/test';
				this.text = 'Using Tas to fix callback hell.';

				this.fs.writeFile(this.myFile, this.text, function (err) {
					if (err) {
						log(err);
						return "break";
					}
					tas.next();
				});
			},

			readFile: function () {
				log('readFile()');

				this.fs.readFile(this.myFile, 'utf8', function (err, text) {
					if (err) {
						log(err);
						return "break";
					}

					// Note: The "this" refers to the tasks object in Tas.
					this.text = text;
					tas.next();

					// Important! Bind “this”. See more details
					// in section "3. Pass the data through 'this'"
					// of "1.Basic-flow-control-in-Tas.js";
				}.bind(this));
			},

			setText: function () {
				log('setText()');

				this.text += '\nAppended something.';
				tas.next();
			},

			writeFile: function () {
				log('writeFile()');

				this.fs.writeFile(this.myFile, this.text, function (err) {
					if (err) {
						log(err);
						return "break";
					}
					tas.next();
				}.bind(this));
			}
		});

		tas(function(){
			log('Done\n');
		});
	});
});