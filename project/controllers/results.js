const models = require('../models/models');
const geodata = require('../utilities/geodata');
const fs = require('fs');
const ejs = require('ejs');

/**
 * This code checks for a valid postcode. The regex for this is taken from
 * https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation
 * @param postcode the postcode to validate
 * @returns {boolean} true if the postcode is a valid UK postcode format (still may not exist)
 */
function validPostcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}

const DEFAULT_DIST = 10;

module.exports = {

    /**
     * This function is the overarching search handler for GET
     * @param req the request
     * @param res the response
     * @param login is the user logged in
     */
    handleSearch: function(req, res, login) {

        // req.session lat n lng
        if ((req.query.lat === "" || req.query.lng === "") && req.query.q == "") {
            // enter a postcode
            res.redirect('/');
            return;
        }

        // undefined || empty - return everything
        if (validPostcode(req.query.q)) {
            const obj = {res: res, login: login};
            geodata.postcodeToLocation(req.query.q, onPostcode, obj);
        } else {
            // otherwise keyword search
            keywordSearch(res, login, req.query.q, req.query.lat, req.query.lng);
        }
    },

    /**
     * This is the overarching function for the AJAX portion of the search functionality.
     * @param req the request
     * @param res the response
     */
    ajaxSearch: function(req, res) {

        if (typeof req.body.newPostcode == "undefined") {req.body.newPostcode = "";}
        if (typeof req.body.newKeywords == "undefined") {req.body.newKeywords = "";}
        if (typeof req.body.slider == "undefined") {req.body.slider = 10;}
        if (typeof req.body.sortBy == "undefined") {req.body.sortBy = "distance";}

        const queryPrev = {
            postcode: req.body.newPostcode,
            keyword: req.body.newKeywords,
            slider: req.body.slider,
            sortBy: req.body.sortBy,
            lat: req.query.lat,
            lng: req.query.lng
        };

        if (validPostcode(req.body.newPostcode)) {
            // search by and keyword
            geodata.postcodeToLocation(req.body.newPostcode, ajaxPostcode, {req: req, res: res, prevQuery: queryPrev});
        } else {
            ajaxKeyword(req, res, queryPrev);
        }

    }

};

/**
 * This function is the handler for a postcode based search
 * @param obj This contains the required parameters.
 */
function onPostcode(obj){

    models.Restaurant.find(function (err, results) {
        if (err) {return console.error(err);}

        var actual_results = [];
        var actual_count = 0;

        for (var x in results) {
            results[x].distance = results[x].getDistance(obj.lat, obj.lng);

            if (results[x].distance < DEFAULT_DIST) {
                actual_results[actual_count] = results[x];
                actual_count++;
            }
        }

        obj.res.render('results', { lat: obj.lat, lng: obj.lng, loggedIn: obj.login, results: sortBy({ejs: {results: actual_results}, prevQuery: {sortBy: "distance"}}), prevQuery: { postcode: obj.postcode} });

    });

}

/**
 * This function is the handler for a keyword search
 * @param res the response
 * @param login boolean, is the user logged in
 * @param query the query
 * @param lat geodetic latitude
 * @param lng geodetic longitude
 */
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

        res.render('results', { lat: lat, lng: lng, query: query, loggedIn: login, results: sortBy({ejs: {results: actual_results}, prevQuery: {sortBy: "distance"}}), prevQuery: {keyword: query} });
    });
}

/**
 * This function handles the ajax version of the keyword search
 * @param req the request
 * @param res the response
 * @param queryPrev the previous query
 */
function ajaxKeyword(req, res, queryPrev){

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

/**
 * This function handles the ajax version of the postcode search
 * @param obj this contains the required parameters, such as response, request and others.
 */
function ajaxPostcode(obj){

    models.Restaurant.find({tags: new RegExp(obj.req.body.newKeywords, "i")}, function (err, results) {

        if (err) {return console.error(err);}

        results = distanceFilter(results, obj.lat, obj.lng, obj.req.body.slider);
        obj.ejs = {results: results};

        obj.prevQuery.lat = obj.lat;
        obj.prevQuery.lng = obj.lng;

        renderHtml(obj);


    });
}

/**
 * this function is used in the ajax query, it renders a page that is then sent to the front end. This rendering is of
 * all of the restaurants
 * @param obj this contains the reqiured parameters, such as all of the restaurants
 */
function renderHtml(obj) {

    obj.ejs.results = sortBy(obj);

    const file = fs.readFileSync('views/results-div.ejs', 'ascii');
    const rendered = ejs.render(file, obj.ejs);

    obj.res.send(JSON.stringify({results: obj.ejs.results, html: rendered, prevQuery: obj.prevQuery}));
}

/**
 * This function handles the sorting of the restaurants
 * @param obj the required parameters, eg the restuarants
 * @returns {*} returns the sorted results (restaurants)
 */
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

/**
 * This function filters the results (restaurants) based on the distance
 * @param results the restaurants
 * @param lat geodetic latitude, start point
 * @param lng geodetic longitude, end point
 * @param distance the max distance away that a restaurant can be
 * @returns {Array} an array of te restaurants within the required distance.
 */
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






