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
            photoURL: "",
            score: 0
        });

        newUser.save(function (err, user) {
            if (err) {
                res.render('register', {loggedIn: false, error: "User was not created!"});
                console.error(err);
            }

            // do whatever based on whether it saved or not
            res.redirect('/login', {loggedIn: false});

        });
    }
}


