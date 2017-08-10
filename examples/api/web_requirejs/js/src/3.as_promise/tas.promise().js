/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

define(['../tas', '../../../../../__lib/superagent'],
function(tas, superagent) {

	var request = superagent;
	var data;

	tas.promise(function () {
		var url = 'https://raw.githubusercontent.com/tasjs/tas/master/examples/__res/pics/a.json';
		request.get(url).end(this.done);
	});

	tas(function (err, d) {
		data = d;
	});

	return {
		get: function () {
			return data;
		}
	};
});
