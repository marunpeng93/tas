/**
 * Builder of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('gulp-util'),
	require('through2'),
	require('../package')
)})

(function(gutil, through, pkg){

	var clean = {
		do: function(){
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

					var copyright;
					var cuttingLine = '/*' + (new Array(70 + 1).join('*')) + '*/';
					var newLine = '/*' + (new Array(70 + 1).join('-')) + '*/';
					var mark = '@@@@@@@@';

					({
					transCuttingLine: function(){
						content = content.replace(cuttingLine, mark);
						return this;
					},

					fetchCopyright: function(){
						var str = content.match(/\/\*\*\n\t \* Tas\.js[\s\S]*?\*\//);
						if (str) {
							str = str[0].replace(/\t/g, '');
							copyright = '\n' + newLine + '\n' + str + '\n' + newLine + '\n';
						}
						return this;
					},

					clearComment: function(){
						content = content
							.replace(/\/\*\*\*\*\*\*\/ /g, '')
							.replace(/\/\*\*\*\/ /g, '')
							.replace(/\/\* \d+ \*\//g, '')
							.replace(/\/\*\*\n\t \* Tas\.js[\s\S]*?\*\//g, '')
							.replace(/\/\/ --[\s\S]*?\/\/ --+?\n/g, '')
							.replace(/\n\s*\n\s*\n+/g, '\n\n')
							.replace(/;\n+(?=\})/g, ';\n')
							.replace(/\]\)\;\}\)\)\;$/, '\n]);}));')
						;
						return this;
					},

					insertCopyright: function(){
						content = content.replace(mark, copyright);
						return this;
					}

					}).fetchCopyright().transCuttingLine().clearComment().insertCopyright();
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

	module.exports = clean.do;
});
