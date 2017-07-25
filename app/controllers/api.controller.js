const apiController = (data) => {
    return {
        getAreas(req, res) {
            return data.areas.getAll()
                .then((areas) => res.status(200).send(areas));
        },
        getLandmarks(req, res) {
            return data.landmarks.getAll()
                .then((landmarks) => res.status(200).send(landmarks));
        },
        getUsers(req, res) {
            return data.users.getAll()
                .then((users) => res.status(200).send(users));
        },
        addDestinationComment(req, res) {
            if (!req.user) {
                return res
                    .status(401)
                    .send('You must be logged in in order to comment!');
            }

            const landmarkId = req.params.id;
            const comment = req.body;
            comment.user = {
                username: req.user.username,
                _id: req.user._id,
                pictureUrl: req.user.pictureUrl,
            };

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return res.status(404)
                            .send('Landmark not found!');
                    }

                    return data.landmarks.addComment(landmark, comment);
                })
                .then((newComment) => {
                    return res.status(201)
                        .send(newComment);
                });
        },
        verifyVisitedDestinations(req, res) {
            if (!req.user) {
                return res.status(401)
                    .redirect('/destinations');
            }

            const landmarkId = req.params.landmarkId;
            const file = req.params.file;

            return res.status(200).redirect('/');
        },
    };
};

module.exports = apiController;
