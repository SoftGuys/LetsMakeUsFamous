const { MongoClient } = require('mongodb');

const initialize = (connectionString) => {
    return MongoClient.connect(connectionString);
};

module.exports = initialize;
