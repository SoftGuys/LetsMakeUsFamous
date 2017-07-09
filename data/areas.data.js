const Data = require('./abstractions/data.abstraction');
const COLLECTION_NAME = 'areas';

class AreasData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }

    getByName(areaName) {
        const filter = {
            name: {
                $contains: areaName,
            },
        };

        return this.collection.find(filter)
            .toArray();
    }
}

module.exports = AreasData;
