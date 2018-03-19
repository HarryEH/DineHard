const models = require('../models');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//Cuisines
const cuisines = ["Italian", "Indian", "Chinese", "Korean", "Thai"]

cuisines.forEach(function (c) {
    const tmp = new models.Cuisine({
        type: c
    });

    tmp.save(function (err, tmp) {
        if (err) return console.error(err);
    });

});
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/