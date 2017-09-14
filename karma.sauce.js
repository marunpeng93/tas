
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
	sl_ios_10_2_safari: creator.do('iphone', null, '10.2'),
	sl_ios_10_safari: creator.do('iphone', null, '10'),
	sl_ios_9_3_safari: creator.do('iphone', null, '9.3'),
	sl_ios_9_2_safari: creator.do('iphone', null, '9.2'),
	sl_ios_9_1_safari: creator.do('iphone', null, '9.1'),
	sl_ios_9_0_safari: creator.do('iphone', null, '9.0'),
	sl_ios_8_4_safari: creator.do('iphone', null, '8.4'),
	sl_ios_8_3_safari: creator.do('iphone', null, '8.3'),
	sl_ios_8_2_safari: creator.do('iphone', null, '8.2'),
	sl_ios_8_1_safari: creator.do('iphone', null, '8.1'),

	// Android
	sl_android_6_0: creator.do('android', null, '6.0'),
	sl_android_5_1: creator.do('android', null, '5.1'),
	sl_android_5_0: creator.do('android', null, '5.0'),
	sl_android_4_4: creator.do('android', null, '4.4'),

	// Chrome
	sl_win10_chrome: creator.do('chrome', 'Windows 10'),
	sl_win8_1_chrome: creator.do('chrome', 'Windows 8.1'),
	sl_win8_chrome: creator.do('chrome', 'Windows 8'),
	sl_win7_chrome: creator.do('chrome', 'Windows 7'),
	sl_xp_chrome: creator.do('chrome', 'Windows XP'),
	sl_mac10_12_chrome: creator.do('chrome', 'OS X 10.12'),
	sl_mac10_11_chrome: creator.do('chrome', 'OS X 10.11'),
	sl_mac10_10_chrome: creator.do('chrome', 'OS X 10.10'),
	sl_mac10_9_chrome: creator.do('chrome', 'OS X 10.9'),
	sl_mac10_8_chrome: creator.do('chrome', 'OS X 10.8'),
	sl_linux_chrome: creator.do('chrome', 'linux'),

	// Firefox
	sl_win10_firefox: creator.do('firefox', 'Windows 10'),
	sl_win8_1_firefox: creator.do('firefox', 'Windows 8.1'),
	sl_win8_firefox: creator.do('firefox', 'Windows 8'),
	sl_win7_firefox: creator.do('firefox', 'Windows 7'),
	sl_xp_firefox: creator.do('firefox', 'Windows XP'),
	sl_mac10_12_firefox: creator.do('firefox', 'OS X 10.12'),
	sl_mac10_11_firefox: creator.do('firefox', 'OS X 10.11'),
	sl_mac10_10_firefox: creator.do('firefox', 'OS X 10.10'),
	sl_mac10_9_firefox: creator.do('firefox', 'OS X 10.9'),
	sl_mac10_8_firefox: creator.do('firefox', 'OS X 10.8'),
	sl_linux_firefox: creator.do('firefox', 'linux'),

	// Edge
	sl_edge_15: creator.do('MicrosoftEdge', 'Windows 10', '15'),
	sl_edge_14: creator.do('MicrosoftEdge', 'Windows 10', '14'),
	sl_edge_13: creator.do('MicrosoftEdge', 'Windows 10', '13'),

	// IE
	sl_ie_11_win_10: creator.do('internet explorer', 'Windows 10', '11'),
	sl_ie_11: creator.do('internet explorer', 'Windows 8.1', '11'),
	sl_ie_10: creator.do('internet explorer', 'Windows 8', '10'),
	sl_ie_9: creator.do('internet explorer', 'Windows 7', '9'),

	// Safari
	sl_mac10_12_safari: creator.do('safari', 'OS X 10.12'),
	sl_mac10_11_safari: creator.do('safari', 'OS X 10.11'),
	sl_mac10_10_safari: creator.do('safari', 'OS X 10.10'),
	sl_mac10_9_safari: creator.do('safari', 'OS X 10.9'),
	sl_mac10_8_safari: creator.do('safari', 'OS X 10.8')
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

			// your app for browser
			'./dist/tas.js',

			// karma files
			'./test/karma/**/*.js',

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
