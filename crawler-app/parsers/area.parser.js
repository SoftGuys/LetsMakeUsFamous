/* globals __dirname */

const { Area } = require('../models/area');
const { selectors } = require('../selectors');
const { parseLandmark } = require('./landmark.parser');
const { initDomParser } = require('./dom-parser');

const REQUEST_SPEED = 3000;

const parseAreas = (url) => {
    let areas = [];

    const getAreaLandmarks = (area) => {
        const landmarkRoute = selectors.BASE_URL + area.id;

        return fetch(landmarkRoute)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                return initDomParser(html);
            })
            .then(($) => {
                const $elements = $(selectors.ITEMLIST);
                $elements.each((_, elem) => {
                    const $elem = $(elem);
                    const href = $elem.attr('href').split('/')[3];
                    if (href === 'item') {
                        return;
                    }

                    const landmarkUrl = selectors.BASE_URL + area.id + '/' + href;
                    parseLandmark(landmarkUrl)
                        .then((landmark) => {
                            area.landmarksIds.push(landmark);

                            const fs = require('fs');
                            const request = require('request');
                            const path = require('path');

                            console.log('.');

                            const download = (uri, filename) => {
                                request.head(uri, (err, res, body) => {
                                    if (!uri.includes('undefined')) {
                                        filename = filename.replace(/[\s+\-+\"+\'+\\+\/+:+]/gi, '');

                                        filename = '../images/' + filename;
                                        request(uri)
                                            .pipe(fs.createWriteStream(path.join(__dirname, filename)));
                                    }
                                });
                            };

                            download(landmark.pictureUrl, landmark.title + '.jpeg');
                        });
                });
            });
    };

    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            return Area.fromHtml(html);
        })
        .then((resAreas) => {
            areas = resAreas;
            const promises = resAreas.map((area, index) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() =>
                        resolve(getAreaLandmarks(area)), index * REQUEST_SPEED);
                });
            });

            return Promise.all(promises);
        })
        .then(() => {
            return areas;
        });
};


module.exports = { parseAreas };
