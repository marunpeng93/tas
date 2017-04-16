
var sauce = require('./sauce.json');

// SauceLabs options：
// https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
var sauceLabs = {
	public: 'public',
	recordVideo: false,
	recordScreenshots: false,
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

	// pc
	sl_win_chrome: creator.do('chrome', 'Windows 7'),
	sl_mac_chrome: creator.do('chrome', 'OS X 10.10'),
	sl_win_firefox: creator.do('firefox', 'Windows 7'),
	sl_mac_firefox: creator.do('firefox', 'OS X 10.10'),
	sl_mac_safari: creator.do('safari', 'OS X 10.11'),
	sl_edge: creator.do('MicrosoftEdge', 'Windows 10'),
	sl_ie_9: creator.do('internet explorer', 'Windows 7', '9'),
	sl_ie_10: creator.do('internet explorer', 'Windows 8', '10'),
	sl_ie_11: creator.do('internet explorer', 'Windows 10', '11'),

	// mobile
	sl_ios_8_safari: creator.do('iphone', null, '8.4'),
	sl_ios_9_safari: creator.do('iphone', null, '9.3'),
	sl_android_4_2: creator.do('android', null, '4.2'),
	sl_android_5_1: creator.do('android', null, '5.1')
};

// Karma Options
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (KarmaConfig) {

	if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
		process.env.SAUCE_USERNAME = sauce.username;
		process.env.SAUCE_ACCESS_KEY = sauce.accesskey;
	}

	var maxExecuteTime = 5*60*1000;
	KarmaConfig.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'dist/tas.js',
			'examples/__lib/superagent.js',
			'test/config.js',

			'test/karma/0.basic/*.js',
			'test/karma/1.pass_the_data/*.js',
			'test/karma/2.async_tasks/*.js',
			'test/karma/3.as_promise/*.js',
			'test/karma/4.break_the_flow/*.js'
		],

		autoWatch: false,
		singleRun: true,
		sauceLabs: sauceLabs,
		customLaunchers: customLaunchers,
		browsers: Object.keys(customLaunchers),
		reporters: ['saucelabs'],
		captureTimeout: maxExecuteTime,
		browserNoActivityTimeout: maxExecuteTime
	});
};
