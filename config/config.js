const config = {
    // eslint-disable-next-line
    PORT: process.env.PORT || 80,

    DB_LOCAL_CONNECTION_STRING: 'mongodb://localhost/tourist-sites',
    DB_LOCAL_TEST_CONNECTION_STRING: 'mongodb://localhost/tourist-sites-test',

    DB_CLOULD_CONNECTION_STRING: 'mongodb://user:123456@ds129053.mlab.com:29053/tourist-sites',
    DB_CLOULD_TEST_CONNECTION_STRING: 'mongodb://user:123456@ds127963.mlab.com:27963/tourist-sites-test',

    DB_CLOULD_AMAZON_CONNECTION_STRING: `mongodb://ec2-35-157-141-50.eu-central-1.compute.amazonaws.com:27017/tourist-sites`,
    DB_CLOULD_TEST_AMAZON_CONNECTION_STRING: `mongodb://ec2-35-157-141-50.eu-central-1.compute.amazonaws.com:27017/tourist-sites-test`,
};

module.exports = config;
