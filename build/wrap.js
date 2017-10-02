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

	var data = {
		header: "(function(r,f){if(typeof define==='function'&&define.amd){define(function(){return f(r,r.document)})}else if(typeof exports==='object'){module.exports=r.document?f(r,r.document):function(w){return f(w,w.document)}}else{r.{{packageName}}=f(r,r.document)}}(typeof window!=='undefined'?window:this,function(window,document){return ",
		footer: '}));'
	};

	var wrap = {
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

					content = content.replace(/^!/, '');
					content = data.header.replace(/\{\{packageName\}\}/g, pkg.name) + content + data.footer;

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

	module.exports = wrap.do;
});
