const usersApiController = (data) => {
    return {
        getUsers(req, res) {
            return data.users.getAll()
                .then((users) => res.status(200).send(users));
        },
        editProfile(req, res) {
            if (!req.user) {
                return res
                    .status(401)
                    .send('You must be logged in in order to edit profile!');
            }

            const newUserInfo = req.body;
            return data.users.findById(req.user._id.toString())
                .then((user) => {
                    Object.keys(newUserInfo)
                        .forEach((key) => {
                            user[key] = newUserInfo[key];
                        });

                    return data.users.updateUserInfo(user);
                })
                .then(() => {
                    res
                        .status(200)
                        .send('Profile eddited successfully!');
                })
                .catch((error) => {
                    res
                        .status(400)
                        .send(error);
                });
        },
    };
};

module.exports = usersApiController;
