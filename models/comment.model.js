class Comment {
    static isModelValid(model) {
        return typeof model === 'undefined' ||
            typeof model.text !== 'string' ||
            !model.text.match(/^[\w!,.?]{5, 60}$/gi);
    }
}

module.exports = Comment;

