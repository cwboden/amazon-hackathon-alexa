var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del')
    zip = require('gulp-zip');

gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('zip', function() {
    return gulp.src(['index.js', 'node_modules'])
        .pipe(zip('SnackOverflow.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['scripts', 'zip']);