const mongoose = require('mongoose');

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

var Restaurant = mongoose.model('Restaurant', restaurantSchema);