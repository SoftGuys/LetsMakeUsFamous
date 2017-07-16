const express = require('express');
const app = express();

const init = (data) => {
    require('./config/app.config')(app);
    require('./config/auth.config')(app, data);
    const controllers = require('./controllers')(data);

    require('./routes')(app, controllers);

    return Promise.resolve(app);
};

module.exports = init;
