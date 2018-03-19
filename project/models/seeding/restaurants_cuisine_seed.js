const models = require('../models');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
const cuisines = ["Italian", "Indian", "Chinese", "Korean", "Thai"]

models.Restaurant.findOne({ name: /^Dine/ }, function (err, res) {
    if (err) return console.error(err);

    models.Cuisine.findOne({type: cuisines[0]}, function(err, result) {

        const tmp = models.RestaurantCuisine({
            rId: res._id,
            cId: result._id
        });

        tmp.save(function (err, tmp) {
            if (err) return console.error(err);
        });

    });

});
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/