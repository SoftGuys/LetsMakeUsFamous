const Data = require('./abstractions');
const COLLECTION_NAME = 'landmarks';

class LandmarksData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }

    getByTitle(title) {
        return this.collection
            .find()
            .toArray()
            .then((landmarks) => {
                return landmarks.filter((l) => {
                    return l.title.includes(title);
                })[0];
            });
    }
}

module.exports = LandmarksData;
