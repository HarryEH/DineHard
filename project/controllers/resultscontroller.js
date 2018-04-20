const models = require('../models/models');
const geodata = require('./geodata');


function validPostcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    //TODO reference this !!!!!!!!
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}

const DEFAULT_DIST = 10000;
const mToDD = 100000;

module.exports = {
    handleSearch: function(req, res, login) {

        req.session.user_lat = req.query.lat;
        req.session.user_lng = req.query.lng;

        // undefined || empty - return everything
        if ((typeof req.query.q == 'undefined') || (req.query.q == "")) {
            returnAll(res, login, req.query.lat, req.query.lng);
        } else if (validPostcode(req.query.q)) {
            const obj = {res: res, login: login, dist: DEFAULT_DIST};
            geodata.postcodeToLocation(req.query.q, onPostcode, obj);
        } else {
            // otherwise keyword search
            keywordSearch(res, login, req.query.q, req.query.lat, req.query.lng);
        }

    }
};

function onPostcode(obj){

    const distAdd = obj.dist / mToDD;

    const lat_min = obj.lat - distAdd;
    const lat_max = obj.lat + distAdd;
    const lng_min = obj.lng - distAdd;
    const lng_max = obj.lng + distAdd;
    console.log(lat_min + ", " + lat_max + ", " + lng_min + ", " + lng_max );

    models.Restaurant.find({lat: { $gt: lat_min, $lt: lat_max }, lng: { $gt: lng_min, $lt: lng_max }}, function (err, results) {
        if (err) {return console.error(err);}

        for (var x in results) {
            results[x].distance = results[x].getDistance(obj.lat, obj.lng);
        }

        obj.res.render('results', { loggedIn: obj.login, results: results, prevQuery: { postcode: obj.postcode} });

    });

}

function returnAll(res, login, lat, lng){
    console.log('all');

    models.Restaurant.find(function (err, results) {
        if (err) {return console.error(err);}

        for (var x in results) {
            results[x].distance = results[x].getDistance(lat, lng);
        }

        res.render('results', { query: "", loggedIn: login, results: results, prevQuery: {} });

    });
}

function keywordSearch(res, login, query, lat, lng){

    models.Restaurant.find({tags: new RegExp(query, "i") } , function (err, results) {
        if (err) {return console.error(err);}

        for (var x in results) {
            results[x].distance = results[x].getDistance(lat, lng);
        }

        res.render('results', { query: query, loggedIn: login, results: results, prevQuery: {keyword: query} });

    });
}


