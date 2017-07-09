const { Landmark } = require('../landmark');
const { initDomParser } = require('../../parsers/dom-parser');
const { selectors } = require('../../selectors');

Landmark.fromHtml = (html) => {
    return initDomParser(html)
        .then(($) => {
            let title = $('h2').text().trim();
            title = title.substring(title.indexOf('.') + 1);
            title = title.replace(/№\d+/g, '');
            title = title.replace(/\s+/g, ' ');
            if (title.startsWith('-')) {
                title = title.substring(2);
            }

            const imageUrl = selectors.DOMAIN +
                $('.itemImage img').attr('src');

            const landmarkIntroDescription = $('.itemIntroText p')
                .last()
                .text();
            const mainDescriptionParts = [];
            $('.itemFullText p')
                .each((_, el) => {
                    const $element = $(el);
                    mainDescriptionParts.push($element.text());
                });

            const mainDescription = mainDescriptionParts.join(' ');

            const description = landmarkIntroDescription +
                ' ' +
                mainDescription;

            const landmark = new Landmark(title, description, imageUrl);
            return landmark;
        });
};
