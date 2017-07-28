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
                    return l.title.toLowerCase().includes(title.toLowerCase());
                });
            });
    }

    addComment(landmark, comment) {
        if (typeof comment === 'undefined' ||
            typeof comment.text !== 'string' ||
            comment.text.length > 200) {
            return Promise.reject('Invalid comment!');
        }

        if (!Array.isArray(landmark.comments)) {
            landmark.comments = [];
        }

        comment.postedOn = Date.now();
        landmark.comments.push(comment);

        return this.collection.update({
                _id: landmark._id,
            }, landmark)
            .then(() => {
                return comment;
            });
    }
}

module.exports = LandmarksData;
