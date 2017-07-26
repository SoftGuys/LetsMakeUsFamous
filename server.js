const config = require('./confi');

Promise.resolve()
    .then(() => require('./database')(config.LOCAL_CONNECTION_STRING))
    .then((database) => require('./data')(database))
    .then((data) => require('./app')(data))
    .then((app) => {
        app.listen(config.PORT,
            () => console.log(`Server running on post ${config.PORT}`));
    });
