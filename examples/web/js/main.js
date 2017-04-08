/**
 * Examples of Tas.js for Web
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function () {

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
		'js/examples/1.Basic-flow-control-in-Tas.js',
		'js/examples/2.Turns-async-callback-to-sync.js',
		'js/examples/3.Understand-the-order-of-Tas-tasks.js',
		'js/examples/4.Fix-callback-hell.js',
		'js/examples/5.Easier-to-use-than-Promise.js',
		'js/examples/6.Use-as-Promise.all-(and-race).js',
		'js/examples/7.Use-as-cancelable-Promise.race.js',
		'js/examples/8.How-powerful-Tas-is.js',
	'']);

})();
