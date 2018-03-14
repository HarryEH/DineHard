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

    postcodeToLocation: function (address, callback, res, login, dist){

        // Geocode an address.
        googleMapsClient.geocode({
            address: address
        }, function(err, response) {
            if (!err) {
                console.log(response.json.results[0].geometry.location);

                const lat = response.json.results[0].geometry.location.lat;
                const lng = response.json.results[0].geometry.location.lng;

                callback(res, login, lat, lng, dist);
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

    locationToAddress: function(lat, long){
        const latlng = {lat: lat, lng: long};
        googleMapsClient.reverseGeocode({
            latlng: [-33.8571965, 151.2151398],
        }, function(err, response) {
            if (!err) {
                console.log("ADDRESS");
                console.log(response.json.results[0].formatted_address);
                return response.json.results[0].formatted_address;
            }
        });
    }
}

