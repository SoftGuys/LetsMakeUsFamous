function usersController(data) {
    return {

        getStartView(req, res, errorMessage) {
            res.render('master', {})
        },

        getHomeView(req, res, errorMessage){
            res.render('home', {})
        },
        getDestinationsView(req, res, errorMessage){
            res.render('destinations', {})
        },
        getRegisterView(req, res, errorMessage){
            res.render('register', {})
        },

        getLoginView(req, res, errorMessage){
            res.render('login', {})
        }
    }
}

module.exports = usersController;
