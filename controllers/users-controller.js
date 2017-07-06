function usersController(data) {
    return {

        getStartView(req, res, errorMessage) {
            res.render('master', {})
        },

        getHomeView(req, res, errorMessage){
            res.render('home',{})
        },
        getDestinationsView(req, res, errorMessage){
            res.render('destinations',{})
        }
    }
}

module.exports = usersController;