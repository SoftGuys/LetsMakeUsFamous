class Data {
    constructor(database, ModelClass, validator) {
        this.database = database;
        this.collectionName = ModelClass.name.toLowerCase() + 's';
        this.collection = this.database.collection(this.collectionName);
        this.validator = validator;
    }

    getAll() {
        return this.collection.find();
    }

    add(model) {
        if (!this.validator.isModelValid(model)) {
            return Promise.reject('Invalid model ' + this.ModelClass.name);
        }

        return this.collection.insert(model);
    }
}

module.exports = Data;
