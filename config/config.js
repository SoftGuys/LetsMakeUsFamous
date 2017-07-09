const DB_USER = 'user';
const DB_PASSWORD = '123456';

const port = 3001;
const connectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@ds153422.mlab.com:53422/touristcli`;

module.exports = {
    port,
    connectionString,
};
