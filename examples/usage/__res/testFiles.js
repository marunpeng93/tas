/**
 * Utils of examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('testFiles', function(){

	var testFiles = {

		// root = examples/nodejs/__tas
		data: [
			'1.sync_tasks/1.hello_world.js',
			'1.sync_tasks/1.hello_world.test.js',
			'1.sync_tasks/2.simplify.js',
			'1.sync_tasks/2.simplify.test.js',
			'1.sync_tasks/3.pass_data.js',
			'1.sync_tasks/3.pass_data.test.js',

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

			'4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.js',
			'4.forEach_tasks/1.Perform_a_set_of_tasks_for_each_array_element.test.js',

			'5.break_the_flow/1.break_the_current_tasks.js',
			'5.break_the_flow/1.break_the_current_tasks.test.js',

			// Because the abort command will exit the remaining tests,
			// so this does not include the test cases of abort.
			// You can run the test cases of abort separately.

			//'5.break_the_flow/2.abort_tas.js',
			//'5.break_the_flow/2.abort_tas.test.js',

			'6.modularization/1.common_a.js',
			'6.modularization/1.common_load.test.js',
			'6.modularization/2.multiple_a.js',
			'6.modularization/2.multiple_b.js',
			'6.modularization/2.multiple_load.test.js',
			'6.modularization/3.chain_a.js',
			'6.modularization/3.chain_b.js',
			'6.modularization/3.chain_c.js',
			'6.modularization/3.chain_d.js',
			'6.modularization/3.chain_load.test.js',

			'7.complex/1.a_crazy_example.js',
			'7.complex/1.a_crazy_example.test.js',
		'']
	};

	return (testFiles);
});
