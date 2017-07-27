/* globals __dirname */
const path = require('path');

const express = require('express');
const app = express();
const utils = require('./utils');

const init = (data) => {
    require('./config/app.config')(app);
    require('./config/auth.config')(app, data);

    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use('/dist', express.static(path.join(__dirname, '../build')));

    const controllers = require('./controllers')(data, utils);
    require('./routes')(app, controllers);

    const server = require('./config/socket.config')(app, data);
    return Promise.resolve(server);
};

module.exports = init;
