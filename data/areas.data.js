const Data = require('./abstractions/data.abstraction');
const COLLECTION_NAME = 'areas';

class AreasData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }
}

module.exports = AreasData;
