const destinationsApiController = (data, utils) => {
    return {
        getAreas(req, res) {
            return data.areas.getAll()
                .then((areas) => res.status(200).send(areas));
        },
        getLandmarks(req, res) {
            return data.landmarks.getAll()
                .then((landmarks) => res.status(200).send(landmarks));
        },
    };
};

module.exports = destinationsApiController;
