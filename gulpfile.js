'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');

gulp.task('default', function() {
    return gulp.src('src/unjector.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('patch', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
});

gulp.task('minor', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
});

gulp.task('major', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type:'major'}))
        .pipe(gulp.dest('./'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
});
