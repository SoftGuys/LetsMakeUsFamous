const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 200;

class Landmark {
    static validateModel(landmark) {
        if (typeof landmark === 'undefined') {
            return Promise.reject('Landmark is undefined!');
        }

        if (typeof landmark.title !== 'string' ||
            landmark.title.trim() === '') {
            return Promise
                .reject('Landmark title must be a non-empty string');
        }

        if (typeof landmark.description !== 'string' ||
            landmark.description.trim() === '') {
            return Promise
                .reject('Landmark description mustb be a non-empty string');
        }

        if (!landmark.longitude || !landmark.latitude) {
            return Promise
                .reject('Landmarks must have longitude and latitude!');
        }

        return Promise.resolve(landmark);
    }

    static validateComment(comment) {
        if (typeof comment === 'undefined' ||
            typeof comment.text !== 'string') {
            return Promise.reject('Invalid comment!');
        }

        if (comment.text.length < MIN_COMMENT_LENGTH ||
            comment.text.length > MAX_COMMENT_LENGTH) {
            return Promise.reject(`Comment length must be between
${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} symbols long`);
        }

        return Promise.resolve(comment);
    }
}

module.exports = Landmark;
