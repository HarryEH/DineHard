const models = require('../models/models');
const bcrypt = require('bcrypt');

module.exports = {

    /**
     * This function handles the login feature of the code
     * @param req the request
     * @param res the response
     */
    handleLogin: function(req, res, next) {
        var username = req.body.u.toLowerCase();
        var password = req.body.p;

        models.User.findOne({username: new RegExp(username, "i")}, function (err, user) {
            if (err) {return console.error(err);}

            if(user !== null) {

                bcrypt.compare(password, user.password, function(err, result) {

                    if (username === user.username.toLowerCase() && result) {
                        req.session.user_id = user._id;
                        req.session.forename = user.forename;

                        if (req.session.prevURL === undefined){
                            res.redirect("/");
                        } else {
                            res.redirect(req.session.prevURL);
                        }


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



