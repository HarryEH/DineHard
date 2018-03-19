const models = require('../models/models');

module.exports = {

    sendEmail: function (req, res, login) {
        // Hit Db to get user's email
        // Send them an email

        console.log(req.body.username);

        
        res.mailer.send('email', {
            to: 'example@example.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Test Email', // REQUIRED.
            otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
        }, function (err) {
            if (err) {
                // handle error
                console.log(err);
                res.send('There was an error sending the email');
                return;
            }

            res.render('forgot-password', {loggedIn: login, error: "Email Sent. Check your Emails"});
        });


    },

    handleReset: function (req, res, login) {
        models.connect();
        // verify that the restaurant's address isn't already in the db

    }

};