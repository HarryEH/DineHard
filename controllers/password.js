const models = require('../models/models');
const bcrypt   = require('bcrypt');

module.exports = {

    /**
     * This function sends an email and generates a URL so the user can reset their password
     * @param req the request
     * @param res the response
     * @param login boolean, is the user logged in
     */
    sendEmail: function (req, res, login) {
        models.User.findOne({ username: new RegExp(req.body.username, "i") }, function (err, user) {
            if (err) return console.error(err);

            const url = "http://"+ req.get('host') +"/change-password?username="+ user.username +"&tokenId="+ user._id;
            console.log(url);// KEEP THIS

            // Send them an email
            req.app.mailer.send('email', {
                to: user.email,
                subject: 'Reset Password',
                unique_url: url,
                username: user.username
            }, function (err) {
                if (err) {
                    // handle error
                    res.render('forgot-password', {loggedIn: login, error: 'There was an error sending the email'});
                    return;
                }
                res.render('forgot-password', {loggedIn: login, error: "Email Sent. Check your Emails"});
            });
        });

    },

    /**
     * This function handles the resetting of the password
     * @param req the request
     * @param res the response
     * @param login boolean, is the user logged in
     */
    handleReset: function (req, res, login) {

        const id  = req.body.tokenId;
        const usr = req.body.username;
        const pss = req.body.password;

        models.User.findOne({username: usr, _id: id}, function (err, user) {

            bcrypt.hash(pss, 10, function(err, hash) {
                user.password = hash;

                user.save(function (err) {
                    if(err) {
                        console.error('ERROR!');
                        res.render('change-password', {tokenId: req.query.tokenId, username: req.query.username,
                            loggedIn: login, error: "That didn't work. Try Again."});
                    }

                    res.redirect('/login');
                });
            });

        });
    }

};