const usersApiController = (data) => {
    return {
        getAreas(req, res, errorMessage) {
            const name = req.query.name;
            let areas;
            if (name) {
                areas = data.areas.getByName(name);
            } else {
                areas = data.areas.getAll();
            }

            return areas.then((resultAreas) => {
                return res.send(resultAreas);
            });
        },
    };
};

module.exports = usersApiController;
