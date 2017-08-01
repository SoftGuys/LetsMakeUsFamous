const config = {
    PORT: 80,
    DB_LOCAL_CONNECTION_STRING: 'mongodb://localhost/tourist-sites',
    DB_LOCAL_TEST_CONNECTION_STRING: 'mongodb://localhost/tourist-sites-test',
    DB_CLOUD_CONNECTION_STRING: `mongodb://ec2-35-157-141-50.eu-central-1.compute.amazonaws.com:27017/tourist-sites`,
    DB_CLOUD_TEST_CONNECTION_STRING: `mongodb://ec2-35-157-141-50.eu-central-1.compute.amazonaws.com:27017/tourist-sites-test`,
};

module.exports = config;
