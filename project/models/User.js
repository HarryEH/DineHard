const mongoose = require('mongoose');

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

var User = mongoose.model('User', userSchema);


// This is just example code
var fluffy = new User({
    forename: "Harry",
    surname: "Howarth",
    email: "h@h.com",
    username: "HarryEH",
    password: "45e$ffdjj3120sH",
    score: 0
});

fluffy.getName();