/* globals __dirname */

const path = require('path');

const express = require('express');
const app = express();

const init = (data) => {
    require('./config/app.config')(app);
    require('./config/auth.config')(app, data);

    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));

    const controllers = require('./controllers')(data);
    require('./routes')(app, controllers);

    return Promise.resolve(app);
};

module.exports = init;
