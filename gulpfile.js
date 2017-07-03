/* globals process */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const app = require('./app');

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3001;

const SERVER_RUNNING_MESSAGE = `Server is running on port ${port}...`;

let server = null;
gulp.task('server', () => {
    server = app.listen(port, () => {
        console.log(SERVER_RUNNING_MESSAGE);
    });
});

gulp.task('server:restart', () => {
    if (server) {
        server.close();
    }

    server = app.listen(port, () => {
        console.log(SERVER_RUNNING_MESSAGE);
    });
});

gulp.task('dev', ['server:restart'], () => {
    nodemon({
        ext: 'js',
        tasks: ['server:restart'],
        script: 'server.js',
    });
});
