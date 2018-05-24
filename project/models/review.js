const mongoose = require('mongoose');

// Review Schema
var reviewSchema = mongoose.Schema({
    username: String,
    resId: String,
    rating: Number,
    time: String,
    date: { type: Date, default: Date.now },
    photo: { data: Buffer, contentType: String },
    review: String
});

module.exports = {review : mongoose.model('Review', reviewSchema)};

