/**
 * Created by Owen Luke on 17/3/25.
 */

var loadScripts = {
	urls: [],

	do: function (urls) {
		({
			init: function(){
				if (typeof urls !== "undefined") {
					!(urls instanceof Array) && (urls = [urls]);
					[].push.apply(loadScripts.urls, urls);
				}
				return this;
			},

			loadNext: function(){
				var url = loadScripts.urls.shift();
				if (!url) return this;

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
	}
};

var require = loadScripts.do;
