const { Area } = require('../models/area');

const parseAreas = (url) => {
    fetch(url)
    .then(response => {
        return response.text();
    })
    .then(html => {
        return Area.fromHtml(html);
    });
};

module.exports = {
    parseAres
};