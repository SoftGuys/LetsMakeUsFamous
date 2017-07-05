function usersController(data) {
    return{

        getStartView(req, res, errorMessage) {
            res.render('intro',{})
        },

        getHomeView(req,res,errorMessage){
            res.render('home')
        },
    }
}

module.exports = usersController;
