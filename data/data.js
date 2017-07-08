const LandmarksData = require('./landmarks.data');

const init = (database) => {
    return Promise.resolve({
        sites: new LandmarksData(database),
    });
};

module.exports = init;
