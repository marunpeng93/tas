/**
 * Builder of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('gulp'),
	require("gulp-webpack"),
	require('gulp-uglify'),
	require("./webpack.config.js"),
	require("./webpack.min.config.js"),
	require('./wrap'),
	require('./clean'),
	require('./mainjs')
)})

(function(gulp, webpack, uglify, webpackConfig, webpackMinConfig, wrap, clean, mainjs){

	gulp.task("prepare", function(){
		var stream = gulp.src('../main.js')
			.pipe(mainjs(true))
			.pipe(gulp.dest('../'))
		;
		return stream;
	});

	gulp.task("webpack", ["prepare"], function(){
		var stream = gulp.src('../main.js')
			.pipe(webpack(webpackConfig))
			.pipe(wrap())
			.pipe(clean())
			.pipe(gulp.dest('../dist'))
		;
		return stream;
	});

	gulp.task("copyToWeb", ["webpack"], function(){
		return gulp.src('../dist/tas.js')
			.pipe(gulp.dest('../test/web/js'));
	});

	gulp.task("uglify", ["copyToWeb"], function(){
		var stream = gulp.src('../main.js')
			.pipe(webpack(webpackMinConfig))
			.pipe(uglify())
			.pipe(wrap())
			.pipe(gulp.dest('../dist'))
		;
		return stream;
	});

	gulp.task("finished", ["uglify"], function(){
		var stream = gulp.src('../main.js')
			.pipe(mainjs())
			.pipe(gulp.dest('../'))
		;
		return stream;
	});

	gulp.task("default", ["prepare", "webpack", "copyToWeb", "uglify", "finished"]);
});
