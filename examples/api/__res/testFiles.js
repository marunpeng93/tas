/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('testFiles', function(){

	var testFiles = {

		// root = examples/api/nodejs
		data: [
			'1.sync_tasks/hello_world.js',
			'1.sync_tasks/hello_world.test.js',
			'1.sync_tasks/pass_data.js',
			'1.sync_tasks/pass_data.test.js',
			'1.sync_tasks/simplify.js',
			'1.sync_tasks/simplify.test.js',

			'2.async_tasks/return_await.js',
			'2.async_tasks/return_await.test.js',
			'2.async_tasks/tas.await().js',
			'2.async_tasks/tas.await().test.js',
			'2.async_tasks/tas.next().js',
			'2.async_tasks/tas.next().test.js',

			'3.as_promise/tas.all().js',
			'3.as_promise/tas.all().test.js',
			'3.as_promise/tas.cancel().js',
			'3.as_promise/tas.cancel().test.js',
			'3.as_promise/tas.promise().js',
			'3.as_promise/tas.promise().test.js',
			'3.as_promise/tas.race().js',
			'3.as_promise/tas.race().test.js',
			'3.as_promise/this.done.js',
			'3.as_promise/this.done.test.js',

			'4.forEach_tasks/return_continue.js',
			'4.forEach_tasks/return_continue.test.js',
			'4.forEach_tasks/tas.continue().js',
			'4.forEach_tasks/tas.continue().test.js',
			'4.forEach_tasks/tas.forEach().js',
			'4.forEach_tasks/tas.forEach().test.js',

			'5.break_the_flow/return_break.js',
			'5.break_the_flow/return_break.test.js',
			'5.break_the_flow/tas.break().js',
			'5.break_the_flow/tas.break().test.js',

			// Because the abort command will exit the remaining tests,
			// so this does not include the test cases of abort.
			// You can run the test cases of abort separately.

			//'5.break_the_flow/return_abort.js',
			//'5.break_the_flow/return_abort.test.js',
			//'5.break_the_flow/tas_abort.js',
			//'5.break_the_flow/tas_abort.test.js',
			'']
	};

	return (testFiles);
});
