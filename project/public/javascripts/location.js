function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
}

function hiddenFields() {
    const lat = sessionStorage.getItem("userLat");
    const lng = sessionStorage.getItem("userLong");

    console.log(lat);
    console.log(lng);

    $( "input#lat" ).val( lat );

    $( "input#lng" ).val( lng );

}

function setPosition(position) {
    sessionStorage.setItem("userLat", position.coords.latitude);
    sessionStorage.setItem("userLong", position.coords.longitude);
}

var rad = function(x) {
    return x * Math.PI / 180;
};

var getRDistance = function(rLat, rLong) {
    var R = 6378137; // Earth’s mean radius in meter
    var userLat = sessionStorage.getItem("userLat");
    var userLong = sessionStorage.getItem("userLong");
    var dLat = rad(rLat - userLat);
    var dLong = rad(rLong - userLong);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(userLat)) * Math.cos(rad(rLat)) *
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

function locationToAddress(lat, long){
    var geocoder  = new google.maps.Geocoder();

    var location  = new google.maps.LatLng(lat, long);
    
    geocoder.geocode({'latLng': location}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var add = results[0].formatted_address;
            alert(add);
        }
    });
}


// module.exports = {
//
//     getDistance: function(lat, lng){
//         getRDistance(lat, lng);
//     }
//
// }