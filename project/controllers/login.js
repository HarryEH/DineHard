const models = require('../models/models');
const bcrypt = require('bcrypt');

module.exports = {

    handleLogin: function(req, res, next) {
        var user = req.body.u.toLowerCase();
        var pass = req.body.p;

        models.User.findOne({username: new RegExp(user, "i")}, function (err, user) {
            if (err) {return console.error(err);}

            console.log(user);
            console.log(user.password);
            console.log(pass);

            if(user !== null) {

                bcrypt.compare(pass, user.password, function(err, result) {
                    if (user === user.username.toLowerCase() && result) {
                        req.session.user_id = user._id;
                        req.session.forename = user.forename;
                        res.redirect(req.session.prevURL);
                    } else {
                        res.render('login', { loggedIn: false, error: "Username and password do not match" });
                    }
                });

            } else {
                res.render('login', { loggedIn: false, error: "Invalid login details" });
            }

        });
    }
}



