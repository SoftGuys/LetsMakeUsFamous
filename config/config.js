const config = {
    PORT: 80,
    DB_CLOUD_CONNECTION_STRING: `mongodb://ec2-35-157-141-50.eu-central-1.compute.amazonaws.com:27017/tourist-sites`,
    DB_LOCAL_CONNECTION_STRING: 'mongodb://localhost/tourist-sites',
};

module.exports = config;
