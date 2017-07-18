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
        addDestinationComment(req, res, errorMessage) {
            if (!req.user) {
                return res.status(401)
                    .send({});
            }

            const landmarkId = req.params.id;
            const comment = req.body;
            comment.user = req.user;

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return res.status(404)
                            .send({ message: 'Landmark not found!' });
                    }

                    return data.landmarks.addComment(landmark, comment);
                })
                .then((updatedLandmark) => {
                    return res.status(200)
                        .send(updatedLandmark);
                });
        },
    };
};

module.exports = apiController;
