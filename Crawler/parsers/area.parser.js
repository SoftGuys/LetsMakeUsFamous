const {Area} = require('../models/area');
const {Selectors} = require('../selectors');
const {parseLandmark} = require('./landmark.parser');
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
                    if (href === Selectors.item) {
                        return;
                    }

                    //new node

                    const landmarkUrl = Selectors.baseurl + area.id + "/" + href;
                    parseLandmark(landmarkUrl)
                        .then((landmark) => {
                            console.log(landmark.pictureUrl)
                            area.landmarksIds.push(landmark);
                            var fs = require('fs'),
                                request = require('request'),
                            path = require('path');
//q sloji 1 path
                            var download = function (uri, filename, callback) {
                                request.head(uri, function (err, res, body) {
                                    console.log('content-type:', res.headers['content-type']);
                                    console.log('content-length:', res.headers['content-length']);

                                    request(uri)
                                        .pipe(fs.createWriteStream(path.join(__dirname, filename)))
                                        .on('close', callback);
                                });
                            };

                            //sample code
                            // 'http://100nto.org/media/k2/items/cache/c9b002fe1bb0320831a8ae78670fdb6f_L.jpg', 'ba.jpg'

                                    //url     // toq download tuka li trqbva da stoi ?? mi proprincip moje da e
                            // po nagore v scope-a samata funkciq ma ne bi trqbvalo da e problem sega tva
                            // iskash li da ti go pushna i az shte se connectna? 
                            // izlez 1 direktoriq nazad             filename
                            download(landmark.pictureUrl, landmark.title+'.jpeg', function () {
                                console.log('done');
                            });
                        });

                    // imaha li title landmarcite :D  da emi q taka ne che koi znae kvo razlichno de ama
                });//vij 4e tuka iska da suzdade nqkva nesushtestvuvashta direktoriq?
                //to mai ochakva ime na fail a nie mu davame direktoriq mai tva e problema mi qvno da
                // da ne bi da trqbva putishtata prez toq path obekt da se pravqt
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