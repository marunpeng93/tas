/**
 * Examples of Tas.js for Web (RequireJS)
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

require([], function(){

	//--------------------------------------------
	// What's Tas
	//--------------------------------------------
	// Tas simplifies code logic, making code easy to maintain.
	// Tas turns async code into sync code, avoiding callback hell,
	// and is faster and easier to use than Promise.

	// Tas can be used in Node.js and in browsers.
	// Tas is a lightweight JavaScript logic framework
	// (only 5KB gzipped), with no dependency.

	// Tas is the abbreviation of "tasks".

	// Learn more about Tas:
	// https://github.com/hiowenluke/tas

	//--------------------------------------------
	// How to use these examples
	//--------------------------------------------
	// 1. Run all examples to see how useful and powerful Tas is.
	// 2. Run one example at a time to get more details in the console.
	// 3. Read the source code of these examples to see how easy it is to use Tas.

	require([
		'examples/1.Basic-flow-control-in-Tas',
		'examples/2.Turns-async-callback-to-sync',
		'examples/3.Understand-the-order-of-Tas-tasks',
		'examples/4.Fix-callback-hell',
		'examples/5.Easier-to-use-than-Promise',
		'examples/6.Use-as-Promise.all-(and-race)',
		'examples/7.Use-as-cancelable-Promise.race',
		'examples/8.How-powerful-Tas-is',
	'']);

});