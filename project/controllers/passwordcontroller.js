const models = require('../models/models');

module.exports = {

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

    handleReset: function (req, res, login) {

        models.connect();

        const id  = req.body.tokenId;
        const usr = req.body.username;
        const pss = req.body.password;

        models.User.findOne({username: usr, _id: id}, function (err, user) {
            user.password = pss;

            user.save(function (err) {
                if(err) {
                    console.error('ERROR!');
                    res.render('change-password', {tokenId: req.query.tokenId, username: req.query.username,
                                                    loggedIn: login, error: "That didn't work. Try Again."});
                }

                res.redirect('/login');
            });
        });
    }

};