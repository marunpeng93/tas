
var sauce = require('./sauce.json');

// SauceLabs options：
// https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
var sauceLabs = {
	public: 'public',
	recordVideo: false,
	recordScreenshots: true,
	testName: 'Cross browsers test for Tas',
	build: 'build-' + Date.now()
};

var creator = {
	do: function  (browser, platform, version) {
		return {
			base: 'SauceLabs',
			browserName: browser,
			platform: platform,
			version: version
		};
	}
};

// Platforms:
// https://saucelabs.com/platforms
var customLaunchers = {

	// iPhone
	sl_ios_9_0_safari: creator.do('iphone', null, '9.0'),

	// Android
	sl_android_4_4: creator.do('android', null, '4.4'),

	// Chrome
	sl_win7_chrome: creator.do('chrome', 'Windows 7'),

	// Firefox
	sl_win7_firefox: creator.do('firefox', 'Windows 7'),

	// Edge
	sl_edge_13: creator.do('MicrosoftEdge', 'Windows 10', '13'),

	// IE
	sl_ie_11: creator.do('internet explorer', 'Windows 8.1', '11'),
	sl_ie_10: creator.do('internet explorer', 'Windows 8', '10'),
	sl_ie_9: creator.do('internet explorer', 'Windows 7', '9'),

	// Safari
	sl_mac10_10_safari: creator.do('safari', 'OS X 10.10')
};

// Karma Options
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) {

	if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
		process.env.SAUCE_USERNAME = sauce.username;
		process.env.SAUCE_ACCESS_KEY = sauce.accesskey;
	}

	var maxExecuteTime = 5*60*1000;
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],

		// list of files / patterns to load in the browser
		files: [

			// app for browser
			'./dist/tas.js',

			// karma files
			'./test/karma/**/*.js',

			// lib references
			'./test/mocha/tas.js',
			'./test/mocha/tester.js',

			// utils for tests
			'./test/__lib/*.js',

			// tests
			'./test/mocha/**/*.js'
		],

		reporters: ['saucelabs'],
		logLevel: config.LOG_INFO,

		autoWatch: false,
		singleRun: true,
		sauceLabs: sauceLabs,
		customLaunchers: customLaunchers,
		browsers: Object.keys(customLaunchers),
		captureTimeout: maxExecuteTime,
		browserNoActivityTimeout: maxExecuteTime
	});
};
