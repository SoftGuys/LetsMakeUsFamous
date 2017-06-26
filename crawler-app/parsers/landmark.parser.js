const { Landmark } = require('../models/landmark');

const parseLandmark = (url) => {
    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            return Landmark.fromHtml(html);
        });
};

module.exports = { parseLandmark };
