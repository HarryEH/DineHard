const models = require('../models/models');
const geodata = require('./geodata');
const fs = require('fs');
const ejs = require('ejs');


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

    },

    ajaxSearch: function(req, res, login) {
        console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
        console.log(req.query.lat);
        console.log(req.query.lng);
        console.log(req.body.newKeywords);
        console.log(req.body.newPostcode);
        console.log(req.body.slider);
        console.log(req.body.sortBy);
        console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");

        if (typeof req.body.newPostcode == "undefined") {
            req.body.newPostcode = "";
        }

        if (typeof req.body.newKeywords == "undefined") {
            req.body.newKeywords = "";
        }

        if (typeof req.body.slider == "undefined") {
            req.body.newKeywords = 10;
        }

        if (typeof req.body.sortBy == "undefined") {
            req.body.sortBy = "priceL2H";
        }

        const queryPrev = {
            postcode: req.body.newPostcode,
            keyword: req.body.newKeywords,
            slider: req.body.slider,
            sortBy: req.body.sortBy
        };

        if (req.body.newPostcode != "" && validPostcode(req.body.newPostcode)) {
            // search by and keyword
            console.log("ajax postcode coming up");
            geodata.postcodeToLocation(req.body.newPostcode, ajaxPostcode, {req: req, res: res, prevQuery: queryPrev});
        } else {
            console.log("ajax keyword coming up");
            ajaxKeyword(req, res, queryPrev);
        }

    }

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Normal searching
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

        console.log(results);

        obj.res.render('results', { loggedIn: obj.login, results: results, prevQuery: { postcode: obj.postcode} });

    });

}

function returnAll(res, login, lat, lng){
    models.Restaurant.find(function (err, results) {
        if (err) {return console.error(err);}

        var actual_results = [];
        var actual_count = 0;

        for (var x in results) {
            results[x].distance = results[x].getDistance(lat, lng);

            console.log(results[x].distance);
            if (results[x].distance < 10) {
                actual_results[actual_count] = results[x];
                actual_count++;
            }
        }

        res.render('results', { query: "", loggedIn: login, results: actual_results, prevQuery: {} });

    });
}

function keywordSearch(res, login, query, lat, lng){

    models.Restaurant.find({tags: new RegExp(query, "i") } , function (err, results) {
        if (err) {return console.error(err);}

        var actual_results = [];
        var actual_count = 0;

        for (var x in results) {
            results[x].distance = results[x].getDistance(lat, lng);

            if (results[x].distance < 10) {
                actual_results[actual_count] = results[x];
                actual_count++;
            }
        }

        res.render('results', { query: query, loggedIn: login, results: actual_results, prevQuery: {keyword: query} });
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX
function ajaxKeyword(req, res, queryPrev){
    console.log("got to ajax keyword");
    var query = req.body.newKeywords;
    if (typeof query == "undefined") {
        query = "";
    }

    models.Restaurant.find({tags: new RegExp(query, "i") } , function (err, results) {
        if (err) {return console.error(err);}

        var actual_results = [];
        var actual_count = 0;

        for (var x in results) {
            results[x].distance = results[x].getDistance(req.query.lat, req.query.lng);

            if (results[x].distance < req.body.slider) {
                actual_results[actual_count] = results[x];
                actual_count++;
            }
        }

        var obj = {res: res, ejs: {results: actual_results, prevQuery: queryPrev} };

        renderHtml(obj);
    });
}

function ajaxPostcode(obj){
    console.log("got to ajax postcode");
    const distAdd = (obj.req.body.slider * 1000) / mToDD;
    const lat_min = obj.lat - distAdd;
    const lat_max = obj.lat + distAdd;
    const lng_min = obj.lng - distAdd;
    const lng_max = obj.lng + distAdd;

    console.log(lat_min + ", " + lat_max + ", " + lng_min + ", " + lng_max );

    models.Restaurant.find({lat: { $gt: lat_min, $lt: lat_max }, lng: { $gt: lng_min, $lt: lng_max }, tags: new RegExp(obj.req.body.newKeywords, "i")}, function (err, results) {
        if (err) {return console.error(err);}

        for (var x in results) {
            results[x].distance = results[x].getDistance(obj.lat, obj.lng);
        }

        obj.ejs = {results: results, prevQuery: obj.prevQuery};

        renderHtml(obj);
    });
}

function renderHtml(obj) {
    console.log("got to render html");

    // obj.ejs.results = sortBy(obj);

    const file = fs.readFileSync('views/results-div.ejs', 'ascii');
    const rendered = ejs.render(file, obj.ejs);

    console.log(rendered);
    console.log(JSON.stringify({prevQuery: obj.ejs.prevQuery, results: obj.ejs.results, html: rendered}));
    obj.res.send(JSON.stringify({results: obj.ejs.results, html: rendered, prevQuery: obj.ejs.prevQuery}));
}


function sortBy(obj){

    const sortParam = obj.prevQuery.sortBy;

    const sortFunc = function(field, reverse, primer){

        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    switch (sortParam) {
        case "priceH2L":
            obj.ejs.results.sort(sortFunc('price', true, parseInt));
            break;
        case "priceL2H":
            obj.ejs.results.sort(sortFunc('price', false, parseInt));
            break;
        case "distance":
            obj.ejs.results.sort(sortFunc('distance', false, parseFloat));
            break;
    }
    return obj.ejs.results;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






