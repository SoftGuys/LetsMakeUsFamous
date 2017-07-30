const config = require('./config');

Promise.resolve()
    .then(() => require('./database')(config.DB_LOCAL_CONNECTION_STRING))
    .then((database) => require('./data')(database))
    .then((data) => require('./app')(data))
    .then((app) => {
        // eslint-disable-next-line
        app.listen(config.PORT, () => console.log(`Server running on post ${config.PORT}`));
    });
