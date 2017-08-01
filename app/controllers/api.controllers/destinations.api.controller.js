const destinationsApiController = (data, utils) => {
    return {
        getDestinations(req, res) {
            return data.landmarks.getAll()
                .then((landmarks) => res.status(200).send(landmarks));
        },
        editDestinationComment(req, res) {
            const comment = req.body;
            const landmarkId = req.params.id;

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return Promise.reject('Such landmark does not exist');
                    }

                    const commentToUpdate = landmark.comments
                        .find((x) => x.text === comment.oldText);

                    if (typeof (commentToUpdate) === 'undefined') {
                        return Promise.reject('Such comment does not exist');
                    }

                    commentToUpdate.text = comment.newText;
                    return data.landmarks.update(landmark);
                })
                .then((response) => {
                    return res
                        .status(200)
                        .send(response);
                })
                .catch((err) => {
                    return res
                        .status(400)
                        .send(err);
                });
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
                        return Promise.reject('Landmark not found!');
                    }

                    return data.landmarks.addComment(landmark, comment);
                })
                .then((newComment) => {
                    return res
                        .status(201)
                        .send(newComment);
                })
                .catch((errMessage) => {
                    return res
                        .status(400)
                        .send(errMessage);
                });
        },
        deleteDestinationComment(req, res) {
            const isAdmin = req.user && req.user.isAdmin;
            const landmarkId = req.params.id;

            const commentText = req.body.text;

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return Promise.reject('Landmark does not exist!');
                    }

                    const index = landmark.comments
                        .findIndex((c) => c.text === commentText);
                    if (index < 0) {
                        return Promise.reject('No such comment!');
                    }

                    if (landmark.comments[index].user.username !==
                        req.user.username && !isAdmin) {
                        return Promise.reject(
                            'You must be an admin in order to delete!');
                    }

                    landmark.comments.splice(index, 1);
                    return data.landmarks.update(landmark);
                })
                .then((result) => {
                    return res
                        .status(200)
                        .send(result);
                })
                .catch((error) => {
                    return res
                        .status(400)
                        .send(error);
                });
        },
    };
};

module.exports = destinationsApiController;
