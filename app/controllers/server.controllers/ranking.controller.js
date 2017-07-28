const rankingController = ({ users }, { getPagination }) => {
    return {
        getRankingView(req, res) {
            const page = Number(req.query.page);

            return users.count()
                .then((usersCount) => {
                    const pagination = getPagination(page, usersCount);
                    const sortedUsersPromise = users.getSortedByVisitedPlaces(
                        pagination.currentPage,
                        pagination.pageSize);

                    return Promise.all([
                        sortedUsersPromise,
                        pagination,
                    ]);
                })
                .then(([resultUsers, pagination]) => {
                    return res.render('users/ranking', {
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
    };
};

module.exports = rankingController;
