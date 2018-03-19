const models = require('../models/models');
const geodata = require('./geodata');

const mToDD = 100000;

function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}

module.exports = {
    handleSearch: function(req, res, login) {

        const str = req.query.q;
        var lat = req.query.lat;
        req.session.user_lat = lat;
        var lng = req.query.lng;
        req.session.user_lng = lng;
        var dist = req.query.distance;

        const DEFAULT_DIST = 5000;

        if (typeof dist == 'undefined') {
            dist = DEFAULT_DIST;
        }

        models.connect();

        // undefined || empty - return everything
        if (typeof str == 'undefined') {
            returnAll(res, login, lat, lng);
            return;
        }

        // undefined || empty - return everything
        if (str == "") {
            returnAll(res, login, lat, lng);
            return;
        }

        // if postcode
        if (valid_postcode(str)) {
            const obj = {res: res, login: login, dist: dist};
            geodata.postcodeToLocation(str, onPostcode, obj);
            return;
        }

        // otherwise keyword search
        keywordSearch(res, login, str, lat, lng);
    }
};

function onPostcode(obj){

    const res = obj.res;
    const login = obj.login;
    const lat = obj.lat;
    const lng = obj.lng;
    const distance = obj.dist;

    const distAdd = distance / mToDD;

    const lat_min = lat - distAdd;
    const lat_max = lat + distAdd;
    const lng_min = lng - distAdd;
    const lng_max = lng + distAdd;

    models.connect();

    models.Restaurant.find({lat: { $gt: lat_min, $lt: lat_max }, lng: { $gt: lng_min, $lt: lng_max }}, function (err, results) {
        if (err) {return console.error(err);}

        console.log(results);

        for(var i = 0; i < results.length; i++) {
            results[i].distance = results[i].getDistance(lat, lng);
        }

        res.render('results', { loggedIn: login, results: results });

    });

}

function returnAll(res, login, lat, lng){
    console.log('all');

    models.Restaurant.find(function (err, results) {
        if (err) {return console.error(err);}

        console.log(results);

        for(var i = 0; i < results.length; i++) {
            results[i].distance = results[i].getDistance(lat, lng);
        }

        res.render('results', { query: "", loggedIn: login, results: results });

    });
}

function keywordSearch(res, login, str, lat, lng){
    // Keyword search!
    models.connect();

    // May need this when we are dynamically changing the distance
    // const distAdd = dist / mToDD;
    //
    // const lat_min = lat - distAdd;
    // const lat_max = lat - (-distAdd);
    // const lng_min = lng - distAdd;
    // const lng_max = lng - (-distAdd);

    models.Restaurant.find({tags: new RegExp(str, "i") } , function (err, results) {
        if (err) {return console.error(err);}

        console.log(results);

        for(var i = 0; i < results.length; i++) {
            results[i].distance = results[i].getDistance(lat, lng);
        }

        res.render('results', { query: str, loggedIn: login, results: results });

    });
}


