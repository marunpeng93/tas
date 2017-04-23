/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

// Thanks David Calhoun
// Reference: What Is AMD, CommonJS, and UMD?
// http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function (root, factory) {

	if (typeof process === 'object' && process.title === "node") { // NodeJS
		module.exports = factory(root);
		return;
	}

	if (typeof define === 'function' && define.amd) { // Web AMD
		define(function () {
			return factory(root, root.document);
		});
		return;
	}

	if (typeof exports === 'object') { // Web CMD
		module.exports = root.document ? factory(root, root.document) : function (window) {
			return factory(window, window.document);
		};
		return;
	}

	// Web
	root.testFiles = factory(root, root.document);

}(typeof window !== "undefined" ? window : this, function (window, document) {

	var testFiles = {

		// root = test/nodejs
		data: [
			'0.basic/hello_world.js',
			'0.basic/hello_world.test.js',
			'0.basic/simplify.js',
			'0.basic/simplify.test.js',

			'1.pass_the_data/via_return.js',
			'1.pass_the_data/via_return.test.js',
			'1.pass_the_data/via_tas.js',
			'1.pass_the_data/via_tas.test.js',
			'1.pass_the_data/via_this.js',
			'1.pass_the_data/via_this.test.js',

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
			'3.as_promise/tas.forEach().js',
			'3.as_promise/tas.forEach().test.js',

			'4.break_the_flow/return_break.js',
			'4.break_the_flow/return_break.test.js',
			'4.break_the_flow/return_ignore.js',
			'4.break_the_flow/return_ignore.test.js',
			'4.break_the_flow/tas.break().js',
			'4.break_the_flow/tas.break().test.js',
			'4.break_the_flow/tas.reset().js',
			'4.break_the_flow/tas.reset().test.js',
		'']
	};

	return (testFiles);
}));
