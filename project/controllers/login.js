const models = require('../models/models');

module.exports = {

    handleLogin: function(req, res, next) {
        var user = req.body.u.toLowerCase();
        var pass = req.body.p;

        models.User.findOne({username: new RegExp(user, "i")}, function (err, results) {
            if (err) {return console.error(err);}

            console.log(results);
            if(results !== null) {

                if (user === results.username.toLowerCase() && pass === results.password) {
                    req.session.user_id = results._id;
                    req.session.forename = results.forename;
                    res.redirect(req.session.prevURL);
                } else {
                    res.render('login', { loggedIn: false, error: "Username and password do not match" });
                }
            } else {
                res.render('login', { loggedIn: false, error: "Invalid login details" });
            }

        });
    }
}


