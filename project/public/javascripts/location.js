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