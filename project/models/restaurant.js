const mongoose = require('mongoose');
const geodata  = require('../utilities/geodata');

// Restaurant Schema
var restaurantSchema = mongoose.Schema({
    name: String,
    doorNumber: String,
    postcode: String,
    photoURL: [{ data: Buffer, contentType: String }],
    description: String,
    phoneNo: String,
    tags: String,
    username: String,
    cuisines: String,
    price: Number,
    rating: Number,
    noRating: Number,
    lat: Number,
    lng: Number,
    websiteURL: String
});

restaurantSchema.methods.getDistance = function (lat, lng) {

    var x = geodata.getRDistance(this.lat, this.lng, lat, lng);

    if (isNaN(x)) {
        x = -1;
    }

    return Math.round((x / 1000) * 100) / 100;
};

restaurantSchema.methods.generateURL = function () {
    return "restaurant-" + this.name.replace(/\s/g, '-') + "?rId="+ this._id;
};

module.exports = {restaurant: mongoose.model('Restaurant', restaurantSchema)};
