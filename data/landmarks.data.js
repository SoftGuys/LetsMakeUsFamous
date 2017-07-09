const Data = require('./abstractions');
const COLLECTION_NAME = 'landmarks';

class LandmarksData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }
}

module.exports = LandmarksData;
