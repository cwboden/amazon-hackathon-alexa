var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    zip = require('gulp-zip');

gulp.task('scripts', function() {
    return gulp.src(['src/**/*.js', 'node_modules'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('zip', function() {
    return gulp.src(['dist/**/*'])
        .pipe(zip('SnackOverflow.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['scripts', 'zip']);