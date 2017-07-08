const { Landmark } = require('../landmark');
const { initDomParser } = require('../../parsers/dom-parser');
const { selectors } = require('../../selectors');

Landmark.fromHtml = (html) => {
    return initDomParser(html)
        .then(($) => {
            const title = $(selectors.LANDMARK_TITLE_SELECTOR).text().trim();
            const imageUrl = selectors.DOMAIN + $(selectors.LANDMARK_IMG_SELECTOR)
                .attr('src');
            const description = $(selectors.LANDMARK_DESCRIPTION_SELECTOR).last().text()
                .replace('Описание:', '').trim();

            const landmark = new Landmark(title, description, imageUrl);
            return landmark;
        });
};
