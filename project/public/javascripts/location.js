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

function myMap(){
    const mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function addMarkers(lat,lng) {

    const mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: 'Restaurant'
    });

    map.addMarker(marker);

    map.addMarker(lat, lng);

}