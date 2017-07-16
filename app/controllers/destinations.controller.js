const destinationsController = (data) => {
    return {
        getDestinationsView(req, res, errorMessage) {
            data.areas.getAll()
                .then((areas) => {
                    return res.render('destinations', {
                        model: areas,
                    });
                });
        },
    };
};

module.exports = destinationsController;
