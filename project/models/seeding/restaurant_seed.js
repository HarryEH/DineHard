const models = require('../models');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
var one = new models.Restaurant({
    name: "Dine Hard",
    doorNumber: "37",
    postcode: "NE2 4RQ",
    phoneNo: "01912401786",
    description: "pua shite",
    cuisines: "Italian",
    lat: 54.9857359,
    lng: -1.6080269,
    photoURL: "null",
    price: 10,
    tags: "homely, warm, good ambiance",
    rating: 3.14,
    websiteURL: "http://howarth.io"
});

one.save(function (err, one) {
    if (err) return console.error(err);

});

var two = new models.Restaurant({
    name: "Harry Smells",
    doorNumber: "37",
    postcode: "s1 4dg",
    phoneNo: "07504988541",
    description: "pua brilliant",
    cuisines: "Chinese",
    lat: 53.3806721,
    lng: -1.4822935,
    photoURL: "lol",
    price: 2,
    tags: "smelly",
    rating: 4.37,
    websiteURL: "http://harryehowarth.com"
});

two.save(function (err, two) {
    if (err) return console.error(err);

});
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/