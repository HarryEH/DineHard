const models = require('../models/models');

models.connect();

module.exports = {
    handleRegister: function(req, res, next) {

        var fname = req.body.f;
        var sname = req.body.s;
        var email = req.body.e;
        var user = req.body.u;
        var pass = req.body.p;

        var registerOk = true;
        var userError = "";
        var emailError = "";

        models.connect();

        var newUser = new models.User({
            forename: fname,
            surname: sname,
            email: email,
            username: user,
            password: pass,
            photoURL: "",
            score: 0
        });

        models.User.findOne({username: user}, function (err, results) {
            if (err) {
                return console.error(err);
            }

            console.log("USER SEARCH");
            console.log(results);

            if (results) {
                console.log("NO");
                registerOk = false;
                userError = "* This Username is not available *";
            }

            models.User.findOne({email: email}, function (err, results) {
                if (err) {
                    return console.error(err);
                }

                console.log("EMAIL SEARCH");
                console.log(results);

                if (results) {
                    console.log("NO");
                    registerOk = false;
                    emailError = "* This Email Address is already in use *";
                }

                console.log(registerOk);

                if(registerOk === true) {
                    console.log("REGIST IS OK");
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
                    console.log("REGIST IS NOT OK");
                    res.render('register', {
                        loggedIn: false,
                        error: "",
                        uerror: userError,
                        emerror: emailError
                    });
                }
            });

        });



    }
};


