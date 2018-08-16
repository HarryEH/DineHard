const mongoose = require('mongoose');
const user = require('./user');
const review = require('./review');
const restaurant = require('./restaurant');

/**
 * Exports from this module
 */
module.exports = {

    User: user.user,
    Review: review.review,
    Restaurant: restaurant.restaurant,

    connect: function() {
        mongoose.connect('mongodb://localhost/mydb');

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            // we're connected!
            console.log("connected");
        });
    },

    close: function() {
        mongoose.connection.close();
    }

};

