const passport = require('passport');
const fs = require('fs');
const crypto = require('crypto-js');


const authController = (data) => {
    return {
        logout(req, res){
            req.logout();
            res.send(window.location.href = '/');
        },
        aboutUs(req, res){
            return res.render('about');
        }
    }
}

module.exports = authController;
