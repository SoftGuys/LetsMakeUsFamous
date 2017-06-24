const { Landmark } = require('../landmark');
const initDomParser = require('../dom-parser');

Landmark.fromHtml = (html) => {
    return initDomParser(html)
        .then($ => {
            const title = $('.itemHeader .itemTitle').text().trim();
            const imageUrl = domain + $('.itemImage a img').attr('src');
            const description = $('.itemIntroText').last().text().replace('Описание:', '').trim();

            const landmark = new Landmark(title, description, imageUrl);
            return landmark;
        });
};