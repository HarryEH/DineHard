const mongoose = require('mongoose');

var cuisineSchema = mongoose.Schema({
    type: String
});

cuisineSchema.methods.getName = function () {
    var greeting = this.rId + ", " + this.cId;
    console.log(greeting);
};

var Cuisine = mongoose.model('Cuisine', cuisineSchema);