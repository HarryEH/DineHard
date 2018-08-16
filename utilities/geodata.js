const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyApmqRUl9K_tUZmUR-0Rpk0snnYx7XDaMA'
});

/**
 * This function converts degrees to radians
 * @param x the number to convert
 * @returns {number} returns the radian value of x
 */
function rad(x) {
    return x * Math.PI / 180;
};

module.exports = {

    /**
     * This function gets the haversine distance between two points. This means that it accounts for curvature of the
     * earth.
     * @param xLat geodetic latitude of point one
     * @param xLng geodetic longitude of point one
     * @param yLat geodetic latitude of point two
     * @param yLng geodetic longitude of point two
     * @returns {number} returns the distance between them
     */
    getRDistance: function(xLat, xLng, yLat, yLng) {
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = rad(xLat - yLat);
        const dLong = rad(xLng - yLng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(yLat)) * Math.cos(rad(xLat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d; // returns the distance in meters
    },

    /**
     * This function converts a postcode to geodetic coordinates. It also takes a function and an object to be passed
     * to this function, this is so that something can be done with the geodetic coordinates that are returned.
     * @param address the postcode to convert
     * @param callback the function to run with the result
     * @param obj the parameters we want to pass
     */
    postcodeToLocation: function (address, callback, obj){
        console.error("starting postcode")
        // Geocode an address.
        googleMapsClient.geocode({
            address: address
        }, function(err, response) {
            if (err) console.error(err);
            if (!err) {

                if(typeof response.json.results[0] == "undefined") {
                    obj.postcode = address;
                    obj.lat = 0;
                    obj.lng = 0;

                    console.error("done");

                    callback(obj);

                } else {
                    const lat = response.json.results[0].geometry.location.lat;
                    const lng = response.json.results[0].geometry.location.lng;

                    obj.postcode = address;
                    obj.lat = lat;
                    obj.lng = lng;

                    console.error("done");

                    callback(obj);
                }

                return;
            }

        });

    },


    /**
     * This function gets the full address for a partial address
     * @param callback the function to call after this is complete
     * @param obj the object to pass to this callback
     */
    getFullAddress: function(callback, obj){
        var address = obj.results.postcode.toString();
        googleMapsClient.geocode({
            address: address
        }, function(err, response) {
            if (!err) {
                console.log(response.json.results[0].formatted_address);

                obj.results.address = obj.results.doorNumber.toString() + " " + response.json.results[0].formatted_address;

                callback(obj);
                return;
            }
        });
    }
}

