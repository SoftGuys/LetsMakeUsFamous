const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);

const eslint = require('gulp-eslint');
const pump = require('pump');
const clean = require('gulp-clean');
const exit = require('gulp-exit');

const express = require('gulp-express');
const nodemon = require('gulp-nodemon');

const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server', ['clean-build'], () => {
    express.run(['server.js']);
});

gulp.task('clean-build', gulpsync.sync([
    'clean',
    'build',
]));

gulp.task('clean', () => {
    return gulp
        .src('build', { read: false })
        .pipe(clean());
});

gulp.task('build', [
    'build:lint',
    'build:js',
    'build:css',
]);

gulp.task('build:lint', () => {
    return gulp.src([
            '**/*.js',
            '!node_modules/**',
            '!build/**',
            '!tests/**',
            '!coverage/**',
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build:js', () => {
    return pump([
        gulp.src(['public/**/*.js']),
        babel({ presets: ['es2015'] }),
        uglify(),
        gulp.dest('build'),
    ]);
});

gulp.task('build:css', () => {
    return pump([
        gulp.src(['public/**/*.css']),
        concat('all.css'),
        cleanCss({ compatibility: 'ie8' }),
        gulp.dest('build'),
    ]);
});

gulp.task('dev', () => {
    nodemon({
        ext: 'js',
        script: 'server.js',
    });
});

gulp.task('test', gulpsync.sync([
    'tests:unit',
    'tests:integration',
]));

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src('./tests/unit/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'dot' }))
        .pipe(istanbul.writeReports({
            reportOpts: { dir: './coverage/unit-coverage' },
        }))
        .pipe(exit());
});

gulp.task('tests:integration', ['pre-test'], () => {
    return gulp.src('./tests/integration/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'dot' }))
        .pipe(istanbul.writeReports({
            reportOpts: { dir: './coverage/functional-coverage' },
        }))
        .pipe(exit());
});

gulp.task('tests:functional', () => {
    return gulp.src('./tests/selenium/functional.tests.js', { read: false })
        .pipe(mocha({ reporter: 'dot', timeout: 20000 }))
        .pipe(exit());
});

gulp.task('pre-test', () => {
    return gulp.src([
            './app/**/*.js',
            './data/**/*.js',
            './models/**/*.js',
        ])
        .pipe(istanbul({ includeUntested: true }))
        .pipe(istanbul.hookRequire());
});
