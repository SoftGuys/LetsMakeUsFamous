const destinationsController = (data) => {
    return {
        getDestinationsView(req, res, errorMessage) {
            data.landmarks.getRange(req.query.page, req.query.size)
                .then((landmarks) => {
                    console.log(landmarks);
                    return res.render('destinations', {
                        model: landmarks,
                    });
                });
        },
    };
};

module.exports = destinationsController;
