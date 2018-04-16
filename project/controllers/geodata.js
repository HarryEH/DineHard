const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCefp0BJY5sxA-EwvtHo6a_Pd5_3gHVBF4'
});

var rad = function(x) {
    return x * Math.PI / 180;
};

module.exports = {

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

    postcodeToLocation: function (address, callback, obj){

        // Geocode an address.
        googleMapsClient.geocode({
            address: address
        }, function(err, response) {
            if (!err) {
                console.log(response.json.results[0].geometry.location);

                const lat = response.json.results[0].geometry.location.lat;
                const lng = response.json.results[0].geometry.location.lng;

                obj.postcode = address;
                obj.lat = lat;
                obj.lng = lng;

                callback(obj);
                return;
            }
        });
    },

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

