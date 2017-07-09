const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const express = require('gulp-express');
const eslint = require('gulp-eslint');

gulp.task('server', () => {
    express.run(['server.js']);
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('dev', () => {
    nodemon({
        ext: 'js',
        script: 'server.js',
    });
});

gulp.task('crawler', () => {
    express.run(['./crawler-app/capp.js']);
});
