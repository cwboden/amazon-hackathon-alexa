var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    zip = require('gulp-zip'),
    addsrc = require("gulp-add-src"),
    sequence = require('run-sequence');

gulp.task('scripts', function() {
    return gulp.src(['src/**/*.js', 'src/**/*.js'])
        .pipe(addsrc('node_modules/**', { base: '.'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('zip', function() {
    return gulp.src(['dist/**/*'])
        .pipe(zip('SnackOverflow.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', sequence('scripts', 'zip'));