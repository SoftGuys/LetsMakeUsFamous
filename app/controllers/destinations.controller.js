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

                    return res.render('destinations', {
                        model: {
                            landmarks,
                            pages,
                            currentPage: Number(page),
                        },
                    });
                });
        },
    };
};

module.exports = destinationsController;
