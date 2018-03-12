module.exports = {

    getRDistance: function(xLat, xLng, yLat, yLng ) {
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = rad(xLat - yLat);
        const dLong = rad(xLng - yLng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(yLat)) * Math.cos(rad(xLat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d; // returns the distance in meter
    },

    addressToLocation: function (address){
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                return [latitude, longitude];
            }
        })
    },

    locationToAddress: function(lat, long){
        var geocoder  = new google.maps.Geocoder();

        var location  = new google.maps.LatLng(lat, long);

        geocoder.geocode({'latLng': location}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var add = results[0].formatted_address;
                alert(add);
            }
        });
    }
}

