const DEFAULT_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;

const destinationsController = (data) => {
    const utils = require('../utils');

    return {
        getDestinationsView(req, res) {
            const page = req.query.page || DEFAULT_PAGE;
            const size = req.query.size;

            data.landmarks.getRange(page, size)
                .then((landmarks) => {
                    const pages = utils
                        .getPagination(Number(page), DEFAULT_VISIBLE_PAGES);

                    return res
                        .status(200)
                        .render('destinations/all', {
                            context: {
                                landmarks,
                                pages,
                                currentPage: Number(page),
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                                pageLink: 'destinations',
                            },
                        });
                });
        },
        getDestinationDetailsView(req, res) {
            const targetLandmarkId = req.params.id;

            if (typeof targetLandmarkId === 'undefined') {
                return res.status(304).redirect('/destinations');
            }

            return data.landmarks.findById(targetLandmarkId)
                .then((landmark) => {
                    if (landmark.comments && landmark.comments.length) {
                        landmark.comments.reverse();
                    }

                    return res
                        .status(200)
                        .render('destinations/details', {
                            context: {
                                landmark,
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                            },
                        });
                });
        },
        showMap(req, res) {
            const id = req.params.id;
            data.landmarks.findById(id)
                .then((details)=>{
                    console.log(details);
                    return res.render('destinations/googlemap', {});
                });
        },
    };
};

module.exports = destinationsController;
