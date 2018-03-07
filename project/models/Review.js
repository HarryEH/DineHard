const mongoose = require('mongoose');

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

var Review = mongoose.model('Review', reviewSchema);