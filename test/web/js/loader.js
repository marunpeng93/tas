/**
 * Created by Owen Luke on 17/3/25.
 */

var loadScripts = {
	urls: [],
	status: {},
	callback: null,

	do: function (urls, callback) {
		({
			init: function(){
				loadScripts.saveCallback(callback);

				if (typeof urls !== "undefined") {
					!(urls instanceof Array) && (urls = [urls]);
					[].push.apply(loadScripts.urls, urls);
				}

				return this;
			},

			loadNext: function(){
				var url = loadScripts.urls.shift();
				if (!url) {
					loadScripts.doCallback();
					return this;
				}

				var box = document.getElementsByTagName("head").item(0) || document.documentElement;
				var script = document.createElement("script");

				({
					setOnLoad: function(){
						script.onload = script.onreadystatechange = function () {
							if (/loaded|complete|undefined/.test(script.readyState)) {
								script.onload = script.onerror = script.onreadystatechange = null;
								script.parentNode.removeChild(script);
								script = undefined;
								loadScripts.do();
							}
						};
						return this;
					},

					append: function(){
						script.setAttribute("type", "text/javascript");
						script.setAttribute("src", url);
						box.appendChild(script);
						return this;
					}

				}).setOnLoad().append();
				return this;
			}

		}).init().loadNext();
	},

	saveCallback: function(callback) {
		callback && (loadScripts.callback = callback);
	},

	doCallback: function(){
		loadScripts.callback && loadScripts.callback();
	}
};

var load = loadScripts.do;
