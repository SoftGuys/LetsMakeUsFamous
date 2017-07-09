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
        return this.collection.find();
    }

    add(model) {
        if (typeof model === 'undefined') {
            throw new Error('Model is undefined!');
        }

        if (!this.isModelValid(model)) {
            return Promise.reject('Invalid model ' + this.ModelClass.name);
        }

        return this.collection.insert(model);
    }

    isModelValid() {
        return true;
    }
}

module.exports = Data;
