const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);

const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

const express = require('gulp-express');
const nodemon = require('gulp-nodemon');

const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

const clean = require('gulp-clean');
const pump = require('pump');
const uglify = require('gulp-uglify');

gulp.task('server', ['build-clean'], () => {
    express.run(['server.js']);
});

gulp.task('build:compress-js', () => {
    pump([
        gulp.src('public/js/*.js'),
        uglify(),
        gulp.dest('build'),
    ]);
});

gulp.task('build:concat-css', () => {
    return gulp.src(['public/css/*.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('build:lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build:transpile', () => {
    return gulp
        .src(['public/js/*.js'])
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('build', [
    'build:lint',
    'build:transpile',
    'build:concat-css',
]);

gulp.task('clean', () => {
    return gulp
        .src('build', { read: false })
        .pipe(clean());
});

gulp.task('build-clean', gulpsync.sync([
    'clean',
    'build',
]));

gulp.task('dev', () => {
    nodemon({
        ext: 'js',
        script: 'server.js',
    });
});
