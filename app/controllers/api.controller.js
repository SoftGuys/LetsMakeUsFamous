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
        deleteDestinationComment(req, res) {
            const isAdmin = req.user.isAdmin;
            if (isAdmin) {
                const comment = req.body.text;
                const id = req.body.id;
                return data.landmarks.findById(id)
                    .then((landmark) => {
                        if (landmark === null) {
                            return res.status(404)
                                .send('Landmark is not existing');
                        }
                        const index = landmark.comments
                            .findIndex((c) => c.text === comment);
                        if (index < 0) {
                            return res.status(404)
                                .send('No such comment');
                        }
                        landmark.comments.splice(index, 1);
                        return data.landmarks.update(landmark);
                    }).then((x) => {
                        return res.send(x);
                    });
            }
            return res.status(401)
                .send('You are not admin');
        },
        editProfile(req, res) {
            // handle client ajax and update user info
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
