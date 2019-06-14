var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat');

var scripts = [
	'./src/jquery-1.11.3.min.js',
	'./src/jquery-electron-fix.js',
	'./src/jquery.contextMenu.min.js',
	'./src/w2ui-1.4.3.min.js',
	'./src/codemirror-compressed.js', //codemirror, python mode
	'./src/moment.min.js',
	'./src/colors.js',
	'./src/colorPicker.data.js',
	'./src/colorPicker.js',
	'./src/jsColor.js',
	'./src/chroma.min.js',
	'./src/spin.js',
	'./src/index.js'
];

gulp.task('js',  () => {
	'use strict';
	return gulp.src(scripts)
    	.pipe(concat('app.js'))
    	.pipe(gulp.dest('./js/'));
});

gulp.task('less', () => {
	return gulp.src('./less/app.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});

gulp.task('default', gulp.parallel('js', 'less'));
