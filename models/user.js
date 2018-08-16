const mongoose = require('mongoose');

/**
 * This is just the user schema, self documenting.
 */
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

module.exports = {user : mongoose.model('User', userSchema)};