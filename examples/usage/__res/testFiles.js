/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(n,f){if(typeof define==='function'){define(f)}else if(typeof module!=='undefined'&&module.exports){module.exports=f()}else{this[n]=f()}})
('testFiles', function(){

	var testFiles = {

		// root = examples/nodejs/__tas
		data: [
			'1.sync_tasks/hello_world.js',
			'1.sync_tasks/hello_world.test.js',
			'1.sync_tasks/return_data.js',
			'1.sync_tasks/return_data.test.js',

			'2.async_tasks/async_tasks.js',
			'2.async_tasks/async_tasks.test.js',
			'2.async_tasks/fix_callback_hell_pyramid.js',
			'2.async_tasks/fix_callback_hell_pyramid.test.js',
			'2.async_tasks/pass_data_via_tas.next.js',
			'2.async_tasks/pass_data_via_tas.next.test.js',
			'2.async_tasks/the_order_of_tasks.js',
			'2.async_tasks/the_order_of_tasks.test.js',

			'3.as_promise/tas.promise_in_another_way.js',
			'3.as_promise/tas.promise_in_another_way.test.js',
			'3.as_promise/tas.promise_is_easier_to_use_than_promise.js',
			'3.as_promise/tas.promise_is_easier_to_use_than_promise.test.js',
			'3.as_promise/use_tas.all_as_promise.all.js',
			'3.as_promise/use_tas.all_as_promise.all.test.js',
			'3.as_promise/use_tas.race_as_promise.race.js',
			'3.as_promise/use_tas.race_as_promise.race.test.js',
			'3.as_promise/use_tas.cancel_to_cancel_the_unfinished_tasks.js',
			'3.as_promise/use_tas.cancel_to_cancel_the_unfinished_tasks.test.js',

			'4.forEach_tasks/Perform_a_set_of_tasks_for_each_array_element.js',
			'4.forEach_tasks/Perform_a_set_of_tasks_for_each_array_element.test.js',
			'4.forEach_tasks/return_breakForEach.js',
			'4.forEach_tasks/return_breakForEach.test.js',
			'4.forEach_tasks/return_continue.js',
			'4.forEach_tasks/return_continue.test.js',
			'4.forEach_tasks/tas.breakForEach.js',
			'4.forEach_tasks/tas.breakForEach.test.js',
			'4.forEach_tasks/tas.continue.js',
			'4.forEach_tasks/tas.continue.test.js',

			'5.break_the_flow/return_break.js',
			'5.break_the_flow/return_break.test.js',
			'5.break_the_flow/tas.break.js',
			'5.break_the_flow/tas.break.test.js',

			'6.modularization/common_a.js',
			'6.modularization/common_load.test.js',
			'6.modularization/multiple_a.js',
			'6.modularization/multiple_b.js',
			'6.modularization/multiple_load.test.js',
			'6.modularization/chain_a.js',
			'6.modularization/chain_b.js',
			'6.modularization/chain_c.js',
			'6.modularization/chain_d.js',
			'6.modularization/chain_load.test.js',

			'7.log_tree/tree.js',
			'7.log_tree/tree.test.js',
		'']
	};

	return (testFiles);
});
