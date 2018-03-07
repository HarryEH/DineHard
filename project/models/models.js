const mongoose = require('mongoose');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Restaurant Schema
var restaurantSchema = mongoose.Schema({
    name: String,
    doorNumber: String,
    postcode: String,
    photoURL: String,
    tags: String,
    rating: Number,
    websiteURL: String
});

restaurantSchema.methods.getName = function () {
    var greeting = this.name + " has a rating of " + this.rating;
    console.log(greeting);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cuisine Schema
var cuisineSchema = mongoose.Schema({
    type: String
});

cuisineSchema.methods.getName = function () {
    var greeting = this.rId + ", " + this.cId;
    console.log(greeting);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Restaurant Cuisine Schema - Linker
var restaurantCuisineSchema = mongoose.Schema({
    rId: String,
    cId: String
});

restaurantCuisineSchema.methods.getName = function () {
    var greeting = this.rId + ", " + this.cId;
    console.log(greeting);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Review Schema
var reviewSchema = mongoose.Schema({
    userId: String,
    resId: String,
    rating: Number,
    time: String,
    date: String,
    review: String,
    photos: String
});

reviewSchema.methods.getName = function () {
    var greeting = this.rating;
    console.log(greeting);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User Schema
var userSchema = mongoose.Schema({
    forename: String,
    surname: String,
    email: String,
    username: String,
    password: String,
    score: Number,
    photoURL: String
});

userSchema.methods.getName = function () {
    var greeting = this.surname + ", " + this.forename;
    console.log(greeting);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exports from this file
module.exports = {

    User: mongoose.model('User', userSchema),
    Review: mongoose.model('Review', reviewSchema),
    RestaurantCuisine: mongoose.model('RestaurantCuisine', restaurantCuisineSchema),
    Cuisine: mongoose.model('Cuisine', cuisineSchema),
    Restaurant: mongoose.model('Restaurant', restaurantSchema),

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

// // This is just example code
// var fluffy = new User({
//     forename: "Harry",
//     surname: "Howarth",
//     email: "h@h.com",
//     username: "HarryEH",
//     password: "45e$ffdjj3120sH",
//     score: 0
// });
//
// fluffy.getName();

