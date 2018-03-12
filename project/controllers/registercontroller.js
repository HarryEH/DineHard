var express = require('express');
var router = express.Router();

const models = require('../models/models');

models.connect();

module.exports = {
    handleRegister: function(req, res, next) {
        var fname = req.body.f;
        var sname = req.body.s;
        var email = req.body.e;
        var user = req.body.u;
        var pass = req.body.p;

        models.connect();

        var newUser = new models.User({
            forename: fname,
            surname: sname,
            email: email,
            username: user,
            password: pass,
            score: 0
        });

        newUser.save(function (err, victoria) {
            if (err) return console.error(err);
            res.redirect('/');
        });
    }
}


