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
            if(results !== null){
                if (user === results.username && pass === results.password) {
                    //req.session.user_id = results._id;
                    res.redirect('/');
                } else {
                    res.send('Bad user/pass');
                }
            } else {
                res.send('Bad user/pass');
            }

        });
    }
}


