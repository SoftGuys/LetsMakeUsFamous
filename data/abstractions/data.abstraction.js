const ObjectId = require('mongodb').ObjectID;

class Data {
    constructor(database, ModelClass, validator) {
        if (typeof database === 'undefined') {
            throw new Error('Database is undefined!');
        }

        if (typeof ModelClass === 'undefined') {
            throw new Error('Model class is undefined!');
        }

        if (typeof validator === 'undefined' ||
            typeof validator.validateModel === 'undefined') {
            throw new Error('validator is undefined!');
        }

        this.database = database;
        this.ModelClass = ModelClass;
        this.collectionName = this.ModelClass.name.toLowerCase() + 's';
        this.validator = validator;
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
        return this.validator.validateModel(model)
            .then((resultModel) => {
                return this.collection.insert(resultModel);
            });
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
}

module.exports = Data;
