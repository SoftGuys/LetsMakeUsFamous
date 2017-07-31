const usersPresentationController = (data, utils) => {
    return {
        getRankingView(req, res) {
            const page = Number(req.query.page);

            return data.users.count()
                .then((usersCount) => {
                    const pagination = utils.getPagination(page, usersCount);
                    const sortedUsersPromise =
                        data.users.getSortedByVisitedPlaces(
                            pagination.currentPage,
                            pagination.pageSize);

                    return Promise.all([
                        sortedUsersPromise,
                        pagination,
                    ]);
                })
                .then(([resultUsers, pagination]) => {
                    return res
                        .status(200)
                        .render('users/ranking', {
                            context: {
                                user: req.user,
                                isAuthenticated: req.isAuthenticated(),
                                users: resultUsers,
                                pageLink: 'users/ranking',
                                pagination,
                            },
                        });
                });
        },
        getUsersView(req, res) {
            const page = Number(req.query.page);
            const username = req.query.username;

            const isSearchQuery = username && username.trim() !== '';
            const getUsersCountPromise = isSearchQuery ?
                data.users.getCountByUsername(username) :
                data.users.count();

            return getUsersCountPromise
                .then((usersCount) => {
                    const pagination = utils
                        .getPagination(page, usersCount);

                    return pagination;
                })
                .then((pagination) => {
                    let getUsersPromise;
                    if (!isSearchQuery) {
                        getUsersPromise =
                            data.users.getRange(
                                pagination.currentPage,
                                pagination.pageSize);
                    } else {
                        getUsersPromise =
                            data.users.getByUsername(username)
                            .then((users) => {
                                return users.splice(
                                    ((pagination.current - 1) *
                                        pagination.pageSize),
                                    pagination.pageSize);
                            });
                    }

                    return Promise.all([getUsersPromise, pagination]);
                })
                .then(([resultUsers, pagination]) => {
                    const context = {
                        users: resultUsers,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                        pageLink: 'users',
                        pagination,
                        isSearchQuery: isSearchQuery,
                        searchKey: 'username',
                        searchValue: username,
                    };

                    return res
                        .status(200)
                        .render('users/all', { context });
                });
        },
    };
};

module.exports = usersPresentationController;
