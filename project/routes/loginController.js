var express = require('express');
var router = express.Router();

const models = require('../models/models');

module.exports = {
    handleLogin: function(req, res, next) {
        var user = req.body.u;
        var pass = req.body.p;

        console.log(user)
        console.log(pass);

        models.connect();

        models.User.findOne({username: user}, function (err, results) {
            if (err) {return console.error(err);}

            console.log(results);
            console.log(results.username);
            console.log(results.password);

            if (results.password == pass){
                res.render( 'index', { loggedIn: true});
            } else {
                var error = "Username and Password do not match"
                res.render( 'login', { loggedIn: false, error: error});
            }
        });
    }
}


