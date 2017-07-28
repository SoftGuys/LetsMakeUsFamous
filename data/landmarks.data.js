const Data = require('./abstractions');
const COLLECTION_NAME = 'landmarks';
const Landmark = require('../models/landmark.model');

class LandmarksData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME, Landmark);
    }

    getByTitle(title) {
        if (typeof title !== 'string' || title.trim() === '') {
            return Promise.reject('title must be a non-empty string!');
        }

        return this.collection
            .find()
            .toArray()
            .then((landmarks) => {
                return landmarks.filter((l) => {
                    return l.title.toLowerCase().includes(title.toLowerCase());
                });
            });
    }

    getByTitleCount(title) {
        return this.getByTitle(title)
            .then((landmarks) => {
                return landmarks.length;
            });
    }

    addComment(landmark, comment) {
        const validations = [
            this.validator.validateModel(landmark),
            this.validator.validateComment(comment),
        ];

        return Promise.all(validations)
            .then(([validatedLandmark, validatedComment]) => {
                if (!Array.isArray(validatedLandmark.comments)) {
                    validatedLandmark.comments = [];
                }

                validatedComment.postedOn = Date.now();
                validatedLandmark.comments.push(comment);

                return this.collection.update({
                        _id: validatedLandmark._id,
                    }, validatedLandmark)
                    .then(() => {
                        return validatedComment;
                    });
            });
    }
}

module.exports = LandmarksData;
