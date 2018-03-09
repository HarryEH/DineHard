function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
}

function setPosition(position) {
    sessionStorage.setItem("userLat", position.coords.latitude);
    sessionStorage.setItem("userLong", position.coords.longitude);
}

var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var userLat = sessionStorage.getItem("userLat");
    var userLong = sessionStorage.getItem("userLong");
    var dLat = rad(p2.lat() - userLat);
    var dLong = rad(p2.lng() - userLong);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(userLat)) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

function addressToLocation(address){

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            alert(latitude);
            alert(longitude);
        }
    })
}