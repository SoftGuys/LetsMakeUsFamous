/* globals process */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const express = require('gulp-express');

gulp.task('server', () => {
    express.run(['server.js']);
});

gulp.task('dev', () => {
    nodemon({
        ext: 'js',
        script: 'server.js',
    });
});

gulp.task('crawler', ()=>{
    express.run(['./crawler-app/capp.js'])
})
