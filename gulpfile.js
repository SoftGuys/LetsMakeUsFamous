const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);

const eslint = require('gulp-eslint');
const pump = require('pump');
const clean = require('gulp-clean');

const express = require('gulp-express');
const nodemon = require('gulp-nodemon');

const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('server', ['build-clean'], () => {
    express.run(['server.js']);
});

gulp.task('build:lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build:js', () => {
    return pump([
        gulp.src(['public/js/*.js']),
        babel({ presets: ['es2015'] }),
        uglify(),
        gulp.dest('build'),
    ]);
});

gulp.task('build:css', () => {
    return pump([
        gulp.src(['public/css/*.css']),
        concat('all.css'),
        cleanCss({ compatibility: 'ie8' }),
        gulp.dest('build'),
    ]);
});

gulp.task('build', [
    'build:lint',
    'build:js',
    'build:css',
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
