require('./polyfills');

const {Area} = require('./models/area');
const {Landmark} = require('./models/landmark');
const {Selectors} = require('./selectors');
const initDomParser = require('./dom-parser');
const areas = [];
const landmarks = [];

fetch(Selectors.baseurl)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        return initDomParser(html);
    })
    .then(($) => {
        $(Selectors.h2a).each((_, elem) => {
            const $elem = $(elem);
            const name = $elem.text().trim();
            const route = $elem.attr(Selectors.href).substring('/objects-po-oblasti/'.length);
            const area = new Area(name, route);
            areas.push(area);
        });
    })
    .then(() => {
        const promises = areas.map((area, index) => {
            const landmarkRoute = Selectors.baseurl + area.id;

            return fetch(landmarkRoute)
                .then((response) => {
                    return response.text();
                })
                .then((html) => {
                    return initDomParser(html);
                })
                .then(($) => {
                    const $elements = $(Selectors.itemlist);
                    $elements.each((_, elem) => {
                        const $elem = $(elem);
                        const href = $elem.attr(Selectors.href).split('/')[3];
                        if (href === Selectors.item) {
                            return;
                        }

                        areas[index].landmarksIds.push(href);
                    });
                });

        });

        return Promise.all(promises);
    })
    .then(() => {
        const promises =
            areas.map((area, index) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => resolve(gatherData(area)), index * 1500);
                });
            });

        return Promise.all(promises);
    })
    .then(() => console.log(JSON.stringify(landmarks)));

const gatherData = (area) => {
    const promises = area.landmarksIds.map(landmarkId => {
        const url = (Selectors.baseurl + area.id + "/" + landmarkId).replace('&nbsp;', '');
        return fetch(url)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                return initDomParser(html);
            })
            .then(($) => {
                const title = $('.itemHeader .itemTitle').text().trim();
                const imageUrl = Selectors.domain + $('.itemImage a img').attr('src');
                const description = $('.itemIntroText').last().text().replace('Описание:', '').trim();

                const landmark = new Landmark(title, description, imageUrl);
                landmarks.push(landmark);
            });
    });

    return Promise.all(promises);
};