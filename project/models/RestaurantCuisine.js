const mongoose = require('mongoose');

var restaurantCuisineSchema = mongoose.Schema({
    rId: String,
    cId: String
});

restaurantCuisineSchema.methods.getName = function () {
    var greeting = this.rId + ", " + this.cId;
    console.log(greeting);
};

var RestaurantCuisine = mongoose.model('RestaurantCuisine', restaurantCuisineSchema);