const DEFAULT_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;

const destinationsController = (data) => {
    const utils = require('../utils');

    return {
        getDestinationsView(req, res, errorMessage) {
            const page = req.query.page || DEFAULT_PAGE;
            const size = req.query.size;

            data.landmarks.getRange(page, size)
                .then((landmarks) => {
                    const pages = utils
                        .getPagination(Number(page), DEFAULT_VISIBLE_PAGES);

                    console.log(req.user);
                    return res.render('destinations/all', {
                        model: {
                            landmarks,
                            pages,
                            currentPage: Number(page),
                        },
                        // fix
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    });
                });
        },
        getDestinationDetailsView(req, res, errorMessage) {
            const targetLandmarkId = req.params.id;

            if (typeof targetLandmarkId === 'undefined') {
                return res.status(304).redirect('/destinations');
            }

            return data.landmarks.findById(targetLandmarkId)
                .then((landmark) => {
                    return res.render('destinations/details', {
                        model: landmark,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    });
                });
        },
    };
};

module.exports = destinationsController;
