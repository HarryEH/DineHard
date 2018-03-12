const mongoose = require('mongoose');

const geodata = require('../controllers/geodata');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Restaurant Schema
var restaurantSchema = mongoose.Schema({
    name: String,
    doorNumber: String,
    postcode: String,
    photoURL: String,
    tags: String,
    rating: Number,
    lat: Number,
    lng: Number,
    websiteURL: String
});

restaurantSchema.methods.getDistance = function (lat, lng) {

    var x = geodata.getRDistance(this.lat, this.lng, lat, lng);

    if (isNaN(x)) {
        x = 0;
    }

    return Math.round((x / 1000) * 100) / 100;
};

restaurantSchema.methods.generateURL = function () {
    return this.name.replace(/\s/g, '-') + "?rId="+ this._id;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cuisine Schema
var cuisineSchema = mongoose.Schema({
    type: {type: String, index: {unique: true}}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Restaurant Cuisine Schema - Linker
var restaurantCuisineSchema = mongoose.Schema({
    rId: String,
    cId: String
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
    photoURL: String
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var user = mongoose.model('User', userSchema);
var review = mongoose.model('Review', reviewSchema);
var restaurantcuisine = mongoose.model('RestaurantCuisine', restaurantCuisineSchema);
var cuisine = mongoose.model('Cuisine', cuisineSchema);
var restaurant = mongoose.model('Restaurant', restaurantSchema);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exports from this file
module.exports = {

    User: user,
    Review: review,
    RestaurantCuisine: restaurantcuisine,
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
    }

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

