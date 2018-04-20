const mongoose = require('mongoose');

const geodata = require('../controllers/geodata');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Restaurant Schema
var restaurantSchema = mongoose.Schema({
    name: String,
    doorNumber: String,
    postcode: String,
    photoURL: String,
    description: String,
    phoneNo: String,
    tags: String,
    username: String,
    cuisines: String,
    price: Number,
    rating: Number,
    lat: Number,
    lng: Number,
    websiteURL: String
});

restaurantSchema.methods.getDistance = function (lat, lng) {

    var x = geodata.getRDistance(this.lat, this.lng, lat, lng);

    if (isNaN(x)) {
        x = -1;
    }

    return Math.round((x / 1602) * 100) / 100;
};

restaurantSchema.methods.generateURL = function () {
    return "restaurant-" + this.name.replace(/\s/g, '-') + "?rId="+ this._id;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cuisine Schema
var cuisineSchema = mongoose.Schema({
    type: {type: String, index: {unique: true}}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Review Schema
var reviewSchema = mongoose.Schema({
    username: String,
    resId: String,
    rating: Number,
    time: String,
    date: { type: Date, default: Date.now },
    review: String,
    photos: String
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User Schema
var userSchema = mongoose.Schema({
    forename: String,
    surname: String,
    email: {type: String, index: {unique: true}},
    username: {type: String, index: {unique: true}},
    password: String,
    score: Number,
    admin: { type: Boolean, default: false },
    photoURL: String
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var user = mongoose.model('User', userSchema);
var review = mongoose.model('Review', reviewSchema);
var cuisine = mongoose.model('Cuisine', cuisineSchema);
var restaurant = mongoose.model('Restaurant', restaurantSchema);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exports from this file
module.exports = {

    User: user,
    Review: review,
    Cuisine: cuisine,
    Restaurant: restaurant,

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

