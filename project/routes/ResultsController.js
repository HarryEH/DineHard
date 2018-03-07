var express = require('express');
var router = express.Router();

const models = require('../models/models');

function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}

module.exports = {
    handleSearch: function(req, res) {

        var str = req.query.q;
        console.log(str);

        // undefined || empty - return everything
        if (typeof str == 'undefined') {
            console.log('first');
            models.Restaurant.find(function (err, results) {
                if (err) {return console.error(err);}

                console.log(results);

                res.render('results', { loggedIn: true, results: results  });

            });
            return;
        }

        // undefined || empty - return everything
        if (str == "") {
            console.log('second');
            models.Restaurant.find(function (err, results) {
                if (err) {return console.error(err);}

                console.log(results);

                res.render('results', { loggedIn: true, results: results  });

            });
            return;
        }

        // if postcode
        if (valid_postcode(str)) {
            console.log('third');
            // do something
            console.log("valid_postcode");
            // get the lat lng of the postcode entered
            // find the right size bubble around it
            var lat_min = 54.8;
            var lat_max = 55;
            var lng_min = -1.7;
            var lng_max = -1.5;

            models.connect();

            models.Restaurant.find({lat: { $gt: lat_min, $lt: lat_max }, lng: { $gt: lng_min, $lt: lng_max }}, function (err, results) {
                if (err) {return console.error(err);}

                console.log(results);

                res.render('results', { loggedIn: true, results: results  });

            });
            return;
        }

        res.render('results', { loggedIn: true, results: [{name:"res1"}, {name:"res2"}, {name:"res3"} ]  });
    }
}


