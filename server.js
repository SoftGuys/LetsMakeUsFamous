// eslint-disable-next-line no-process-env
const app = require('./app');

const port = process.env.PORT || 3001;
const SERVER_RUNNING_MESSAGE = `Server is running on port ${port}...`;

app.listen(port, () => console.log(SERVER_RUNNING_MESSAGE));