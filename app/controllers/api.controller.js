const apiController = (data) => {
    return {
        getAreas(req, res, errorMessage) {
            return data.areas.getAll()
                .then((areas) => res.status(200).send(areas));
        },
        getLandmarks(req, res, errorMessage) {
            return data.landmarks.getAll()
                .then((landmarks) => res.status(200).send(landmarks));
        },
        getUsers(req, res, errorMessage) {
            return data.users.getAll()
                .then((users) => res.status(200).send(users));
        },
    };
};

module.exports = apiController;
