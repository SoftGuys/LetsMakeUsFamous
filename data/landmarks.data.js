const Data = require('./abstractions');
const COLLECTION_NAME = 'landmarks';

class LandmarksData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
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
        if (typeof comment === 'undefined' ||
            typeof comment.text !== 'string' ||
            comment.text.length > 200) {
            return Promise.reject('Invalid comment!');
        }

        if (!Array.isArray(landmark.comments)) {
            landmark.comments = [];
        }

        const postDate = new Date(comment.postedOn);
        comment.postedOn = `${postDate.getDate()}.` +
            `${postDate.getMonth()}.` +
            `${postDate.getFullYear()} ` +
            `${postDate.getHours()}:${postDate.getMinutes()}`;

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
