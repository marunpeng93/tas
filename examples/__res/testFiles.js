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

		// root = examples/nodejs/__tas
		data: [
			'1.pass_the_data/1.hello_world.js',
			'1.pass_the_data/1.hello_world.test.js',
			'1.pass_the_data/2.via_return.js',
			'1.pass_the_data/2.via_return.test.js',
			'1.pass_the_data/3.via_this.js',
			'1.pass_the_data/3.via_this.test.js',
			'1.pass_the_data/4.via_tas.js',
			'1.pass_the_data/4.via_tas.test.js',

			'2.async_tasks/1.async_tasks.js',
			'2.async_tasks/1.async_tasks.test.js',
			'2.async_tasks/2.mix_tasks.js',
			'2.async_tasks/2.mix_tasks.test.js',
			'2.async_tasks/3.the_order_of_tasks.js',
			'2.async_tasks/3.the_order_of_tasks.test.js',
			'2.async_tasks/4.fix_callback_hell_(pyramid).js',
			'2.async_tasks/4.fix_callback_hell_(pyramid).test.js',

			'3.as_promise/1.easier_to_use_than_promise.js',
			'3.as_promise/1.easier_to_use_than_promise.test.js',
			'3.as_promise/2.use_tas.all()_as_promise.all().js',
			'3.as_promise/2.use_tas.all()_as_promise.all().test.js',
			'3.as_promise/3.use_tas.race()_as_promise.race().js',
			'3.as_promise/3.use_tas.race()_as_promise.race().test.js',
			'3.as_promise/4.cancel_the_unfinished_tasks.js',
			'3.as_promise/4.cancel_the_unfinished_tasks.test.js',
			'3.as_promise/5.Perform_a_set_of_tasks_for_each_array_element.js',
			'3.as_promise/5.Perform_a_set_of_tasks_for_each_array_element.test.js',

			'4.break_the_flow/1.ignore_the_current_function.js',
			'4.break_the_flow/1.ignore_the_current_function.test.js',
			'4.break_the_flow/2.break_the_current_tasks.js',
			'4.break_the_flow/2.break_the_current_tasks.test.js',
			'4.break_the_flow/3.abort_tas.js',
			'4.break_the_flow/3.abort_tas.test.js',
			'4.break_the_flow/4.reset_tas.js',
			'4.break_the_flow/4.reset_tas.test.js',

			'5.modularization/1.common_a.js',
			'5.modularization/1.common_load.test.js',
			'5.modularization/2.multiple_a.js',
			'5.modularization/2.multiple_b.js',
			'5.modularization/2.multiple_load.test.js',
			'5.modularization/3.chain_a.js',
			'5.modularization/3.chain_b.js',
			'5.modularization/3.chain_c.js',
			'5.modularization/3.chain_d.js',
			'5.modularization/3.chain_load.test.js',

			'6.complex/1.a_crazy_example.js',
			'6.complex/1.a_crazy_example.test.js',
		'']
	};

	return (testFiles);
}));
