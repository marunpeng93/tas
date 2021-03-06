
var tas = require('../../../lib');
var fs = require('fs');
var gm = require('gm');

var source = __dirname + "/images/";
var dest = __dirname + "/images-resize/";
var widths = [100, 200];
var filename;

tas.await(function(){
	fs.readdir(source, function(err, files){
		if (err) return tas.abort('Error finding files: ' + err);
		tas.next(files);
	});
});

tas.forEach({
	init: function(file, index){
		filename = file;
	},

	getImage: function(){
		gm(source + filename).size(function(err, size){
			if (err) return tas.abort('Error identifying file size: ' + err);
			tas.next(size, this);
		});
		return "await";
	},

	resize: function(size, op){
		var aspect = (size.width / size.height);
		console.log(filename + ' : ' + JSON.stringify(size));

		widths.forEach(function (width, widthIndex){
			var height = Math.round(width / aspect);
			console.log('resizing ' + filename + 'to ' + width + 'x' + height);

			op.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
				if (err) console.log('Error writing file: ' + err);
			})
		});
	}
});
