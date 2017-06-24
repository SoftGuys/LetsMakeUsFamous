const { Area } = require('../models/area');
const { Selectors } = require('../selectors');
const { parseLandmark } = require('./landmark.parser');
const initDomParser = require('../dom-parser');

const REQUEST_SPEED = 3000;

const parseAreas = (url) => {
    let areas = [];

    const getAreaLandmarks = (area) => {
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
                    if (href === Selectors.item){ 
                        return;
                    }
                  
                    const landmarkUrl = Selectors.baseurl + area.id + "/" + href;
                    parseLandmark(landmarkUrl)
                        .then((landmark) => {
                            area.landmarksIds.push(landmark);
                        });
                });
            });
    };

    return fetch(url)
        .then(response => {
            return response.text();
        })
        .then(html => {
            return Area.fromHtml(html);
        })
        .then(resAreas => {
            areas = resAreas;
            const promises = resAreas.map((area, index) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => resolve(getAreaLandmarks(area)), index * REQUEST_SPEED);
                });
            });

            return Promise.all(promises);
        })
        .then(() => {
            return areas;
        });
};


module.exports = {
    parseAreas
};