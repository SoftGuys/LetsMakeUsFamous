const ObjectId = require('mongodb').ObjectID;

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

class Data {
    constructor(database, collectionName) {
        if (typeof database === 'undefined') {
            throw new Error('Database is undefined!');
        }

        if (typeof collectionName !== 'string') {
            throw new Error('Incorrect collection name!');
        }

        this.database = database;
        this.collectionName = collectionName;
        this.collection = this.database.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find().toArray();
    }

    findById(id) {
        if (typeof id !== 'string') {
            throw new Error('Invalid id!');
        }

        // eslint-disable-next-line
        return this.collection.findOne({ _id: ObjectId(id) });
    }

    add(model) {
        if (typeof model === 'undefined') {
            throw new Error('Model is undefined!');
        }

        if (!this.isModelValid(model)) {
            throw new Error('Invalid model for ' + this.collectionName);
        }

        return this.collection.insert(model);
    }

    getRange(start, size) {
        start = Number(start);
        size = Number(size);

        if (Number.isNaN(start) || start < 1) {
            start = DEFAULT_PAGE;
        }

        if (Number.isNaN(size) || size < 1) {
            size = DEFAULT_PAGE_SIZE;
        }

        return this.collection.find()
            .skip((start - 1) * size)
            .limit(size)
            .toArray();
    }

    getById(id) {
        const filter = {
            name: id,
        };

        return this.collection.find(filter)
            .toArray();
    }

    isModelValid() {
        return true;
    }
}

module.exports = Data;
