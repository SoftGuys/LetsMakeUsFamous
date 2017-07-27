const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const express = require('gulp-express');
const eslint = require('gulp-eslint');

gulp.task('server', ['build'], () => {
    express.run(['server.js']);
});

gulp.task('compile:lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('compile:transpile', () => {
    return gulp.src(['public/js/**/*.js'])
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('compile', [
    'compile:lint',
    'compile:transpile',
]);

gulp.task('clean', () => {
    return gulp.src('build', { read: false })
        .pipe(clean());
});

gulp.task('build', gulpsync.sync([
    'clean',
    'compile',
]));

gulp.task('dev', () => {
    nodemon({
        ext: 'js',
        script: 'server.js',
    });
});
