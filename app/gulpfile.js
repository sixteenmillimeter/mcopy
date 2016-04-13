var gulp = require('gulp'),
	concat = require('gulp-concat');

var scripts = [
	'./src/jquery-1.11.3.min.js',
	'./src/jquery-electron-fix.js',
	'./src/w2ui-1.4.3.min.js',
	'./src/chroma.min.js',
	'./src/index.js'
];

gulp.task('js', function () {
	'use strict';
	return gulp.src(scripts)
    	.pipe(concat('app.js'))
    	.pipe(gulp.dest('./js/'));
});

gulp.task('default', ['js']);