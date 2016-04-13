var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat');

var scripts = [
	'./src/jquery-1.11.3.min.js',
	'./src/jquery-electron-fix.js',
	'./src/w2ui-1.4.3.min.js',
	'./src/moment.min.js',
	'./src/colors.js',
	'./src/colorPicker.js',
	'./src/chroma.min.js',
	'./src/index.js'
];

gulp.task('js', function () {
	'use strict';
	return gulp.src(scripts)
    	.pipe(concat('app.js'))
    	.pipe(gulp.dest('./js/'));
});

gulp.task('less', function () {
	return gulp.src('./css/*.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});

gulp.task('default', ['js', 'less']);