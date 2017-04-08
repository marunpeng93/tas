/**
 * Builder of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('gulp-util'),
	require('through2'),
	require('../package')
)})

(function(gutil, through, pkg){

	var wrap = {
		do: function(isPrepare){
			return through.obj(function(file, enc, cb) {
				var that = this;
				var error = false;
				var content;

				({
				init: function(){
					if (file.isNull()) {
						that.push(file);
						error = true;
					}

					if (file.isStream()) {
						that.emit('error', new gutil.PluginError('wrap', 'Streaming not supported'));
						error = true;
					}

					content = file.contents.toString();
					return this;
				},

				handle: function(){
					if (error) return this;

					var s = "require('./examples')";
					var a = isPrepare ? s : '//' + s;
					var b = isPrepare ? '//' + s : s;

					content = content.replace(a, b);
					content = content.replace(/\)\;\)\;$/, ');');
					
					return this;
				},

				save: function(){
					if (error) return this;

					file.contents = new Buffer(content);
					that.push(file);
					cb(null, file);

					return this;
				}

				}).init().handle().save();
				if (error) return cb();
			});
		}
	};

	module.exports = (wrap.do);
});
