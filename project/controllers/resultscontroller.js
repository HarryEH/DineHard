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

const DEFAULT_DIST = 10;

module.exports = {
    handleSearch: function(req, res, login) {

        req.session.user_lat = req.query.lat;
        req.session.user_lng = req.query.lng;

        // undefined || empty - return everything
        if (validPostcode(req.query.q)) {
            const obj = {res: res, login: login};
            geodata.postcodeToLocation(req.query.q, onPostcode, obj);
        } else {
            // otherwise keyword search
            keywordSearch(res, login, req.query.q, req.query.lat, req.query.lng);
        }
    },

    ajaxSearch: function(req, res) {

        if (typeof req.body.newPostcode == "undefined") {req.body.newPostcode = "";}
        if (typeof req.body.newKeywords == "undefined") {req.body.newKeywords = "";}
        if (typeof req.body.slider == "undefined") {req.body.slider = 10;}
        if (typeof req.body.sortBy == "undefined") {req.body.sortBy = "distance";}

        const queryPrev = {
            postcode: req.body.newPostcode,
            keyword: req.body.newKeywords,
            slider: req.body.slider,
            sortBy: req.body.sortBy
        };

        if (validPostcode(req.body.newPostcode)) {
            // search by and keyword
            geodata.postcodeToLocation(req.body.newPostcode, ajaxPostcode, {req: req, res: res, prevQuery: queryPrev});
        } else {
            ajaxKeyword(req, res, queryPrev);
        }

    }

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Normal searching
function onPostcode(obj){

    models.Restaurant.find(function (err, results) {
        if (err) {return console.error(err);}

        var actual_results = [];
        var actual_count = 0;

        for (var x in results) {
            results[x].distance = results[x].getDistance(obj.lat, obj.lng);

            console.log(results[x].distance);

            if (results[x].distance < DEFAULT_DIST) {
                actual_results[actual_count] = results[x];
                actual_count++;
            }
        }

        obj.res.render('results', { loggedIn: obj.login, results: sortBy({ejs: {results: actual_results}, prevQuery: {sortBy: "distance"}}), prevQuery: { postcode: obj.postcode} });

    });

}

function keywordSearch(res, login, query, lat, lng){

    const distTest = 10;

    models.Restaurant.find({tags: new RegExp(query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""), "i") } , function (err, results) {
        if (err) {return console.error(err);}

        var actual_results = [];
        var actual_count = 0;

        for (var x in results) {
            results[x].distance = results[x].getDistance(lat, lng);

            if (results[x].distance < distTest) {
                actual_results[actual_count] = results[x];
                actual_count++;
            }
        }

        res.render('results', { query: query, loggedIn: login, results: sortBy({ejs: {results: actual_results}, prevQuery: {sortBy: "distance"}}), prevQuery: {keyword: query} });
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

    models.Restaurant.find({tags: new RegExp(query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""), "i") } , function (err, results) {
        if (err) {return console.error(err);}

        results = distanceFilter(results, req.query.lat, req.query.lng, req.body.slider);
        var obj = {res: res, ejs: {results: results}, prevQuery: queryPrev};

        renderHtml(obj);

    });
}

function ajaxPostcode(obj){
    console.log("got to ajax postcode");

    models.Restaurant.find({tags: new RegExp(obj.req.body.newKeywords, "i")}, function (err, results) {
        if (err) {return console.error(err);}

        results = distanceFilter(results, obj.lat, obj.lng, obj.req.body.slider);
        obj.ejs = {results: results};

        renderHtml(obj);

    });
}

function renderHtml(obj) {
    console.log("got to render html");

    obj.ejs.results = sortBy(obj);

    const file = fs.readFileSync('views/results-div.ejs', 'ascii');
    const rendered = ejs.render(file, obj.ejs);

    obj.res.send(JSON.stringify({results: obj.ejs.results, html: rendered, prevQuery: obj.prevQuery}));
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


function distanceFilter(results, lat, lng, distance){
    var actual_results = [];
    var actual_count = 0;

    for (var x in results) {
        results[x].distance = results[x].getDistance(lat, lng);

        if (results[x].distance < distance) {
            actual_results[actual_count] = results[x];
            actual_count++;
        }
    }

    return actual_results;

}






