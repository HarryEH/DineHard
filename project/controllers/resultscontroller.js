const models = require('../models/models');
const geodata = require('../models/geodata');

function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}

module.exports = {
    handleSearch: function(req, res, login) {

        const str = req.query.q;
        var lat = req.query.lat;
        var lng = req.query.lng;
        var dist = req.query.distance;

        const DEFAULT_DIST = 5000;

        if (typeof dist == 'undefined') {
            dist = DEFAULT_DIST;
        }

        console.log(str);
        console.log(lat);
        console.log(lng);

        models.connect();

        // undefined || empty - return everything
        if (typeof str == 'undefined') {
            returnAll(res, login);
            return;
        }

        // undefined || empty - return everything
        if (str == "") {
            returnAll(res, login);
            return;
        }

        // if postcode
        if (valid_postcode(str)) {

            const geo = geodata.addressToLocation(str);
            lat = geo[0];
            lng = geo[1];

            onPostcode(res, login, lat, lng, dist);

            return;
        }

        //TODO a keyword search!!!!

        //res.render('results', { loggedIn: login, results: [{name:"res1"}, {name:"res2"}, {name:"res3"} ]  });
    }
};

function onPostcode(res, login, lat, lng, distance){

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

        res.render('results', { loggedIn: login, results: results  });

    });

};

function returnAll(res, login){
    console.log('all');

    models.Restaurant.find(function (err, results) {
        if (err) {return console.error(err);}

        console.log(results);

        res.render('results', { loggedIn: login, results: results  });

    });
}



