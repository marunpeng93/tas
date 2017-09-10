/**
 * Created by Owen Luke on 17/3/25.
 */

var require = function(url){
	var moduleName;

	if (url.indexOf('/') === -1) {
		if (modules[url]) {
			moduleName = url;
		}
	}
	else {
		var keys = Object.keys(modules);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var reg = new RegExp(key.replace(/\//g, '\\/').replace(/\./g, '\\.') + '$');

			if (reg.test(url)) {
				moduleName = key;
				break;
			}
		}
	}

	return window[modules[moduleName]];
};
