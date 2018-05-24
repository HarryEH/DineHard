const models = require('../models/models');
const bcrypt = require('bcrypt');

module.exports = {
    handleRegister: function(req, res, next) {

        var fname = req.body.f;
        var sname = req.body.s;
        var email = req.body.e;
        var user = req.body.u.toLowerCase();
        var pass = req.body.p;

        var values = {fname: fname, sname: sname, email: email, user: user};

        var registerOk = true;
        var userError = "";
        var emailError = "";

        bcrypt.hash(pass, 10, function(err, hash) {
            var newUser = new models.User({
                forename: fname,
                surname: sname,
                email: email,
                username: user,
                password: hash,
                photoURL: "",
                score: 0
            });

            models.User.findOne({username: user}, function (err, results) {
                if (err) {
                    return console.error(err);
                }

                if (results) {
                    registerOk = false;
                    userError = "* This Username is not available *";
                }

                models.User.findOne({email: email}, function (err, results) {
                    if (err) {
                        return console.error(err);
                    }

                    if (results) {
                        registerOk = false;
                        emailError = "* This Email Address is already in use *";
                    }

                    if(registerOk === true) {
                        newUser.save(function (err, user) {
                            if (err) {
                                res.render('register', {
                                    loggedIn: false,
                                    error: "User was not created!",
                                    uerror: "",
                                    emerror: ""
                                });
                                console.error(err);
                            }

                            // do whatever based on whether it saved or not
                            res.redirect('/login');

                        });
                    } else {
                        res.render('register', {
                            loggedIn: false,
                            error: "",
                            uerror: userError,
                            emerror: emailError,
                            values: values
                        });
                    }
                });

            });
        });

    }
};



