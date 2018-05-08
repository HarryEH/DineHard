const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyApmqRUl9K_tUZmUR-0Rpk0snnYx7XDaMA'
});

var rad = function(x) {
    return x * Math.PI / 180;
};

module.exports = {

    /**
     *
     * @param xLat
     * @param xLng
     * @param yLat
     * @param yLng
     * @returns {number}
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
     *
     * @param address
     * @param callback
     * @param obj
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
     *
     * @param address
     */
    addressToLocation: function (address){
        // Geocode an address.
        googleMapsClient.geocode({
            address: address
        }, function(err, response) {
            if (!err) {
                console.log(response.json.results[0].geometry.location);
                return response.json.results[0].geometry.location;
            }
        });
    },

    /**
     *
     * @param callback
     * @param obj
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

