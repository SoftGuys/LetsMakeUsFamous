const config = require('./config');

Promise.resolve()
    .then(() => require('./database')(config.localConnectionString))
    .then((database) => require('./data')(database))
    .then((data) => require('./app')(data))
    .then((app) => {
        app.listen(config.port,
            () => console.log(`Server running on post ${config.port}`));
    });
