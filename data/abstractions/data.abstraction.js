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

    count() {
        return this.collection.count();
    }

    getAll() {
        return this.filter({});
    }

    filter(filterObject) {
        return this.collection.find(filterObject).toArray();
    }

    findById(id) {
        if (typeof id !== 'string') {
            return Promise.reject('Invalid id!');
        }

        // eslint-disable-next-line
        return this.collection.findOne({ _id: ObjectId(id) });
    }

    add(model) {
        if (typeof model === 'undefined') {
            return Promise.reject('Model is undefined!');
        }

        if (!this.isModelValid(model)) {
            return Promise.reject('Invalid model for ' + this.collectionName);
        }

        return this.collection.insert(model);
    }

    update(model) {
        if (typeof model === 'undefined') {
            return Promise.reject('Model is undefined!');
        }

        return this.collection.update({
            _id: model._id,
        }, model);
    }

    getRange(start, size) {
        start = Number(start);
        size = Number(size);

        if (Number.isNaN(start) || Number.isNaN(size)) {
            throw new Error('Start and size must be of type number');
        }

        return this.collection.find()
            .skip((start - 1) * size)
            .limit(size)
            .toArray();
    }

    isModelValid() {
        return true;
    }
}

module.exports = Data;
