/**
 * Gets the location of the User
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
}

/**
 * Sets the hidden fields to the values of the Users location
 */
function hiddenFields() {
    const lat = sessionStorage.getItem("userLat");
    const lng = sessionStorage.getItem("userLong");

    console.log(lat);
    console.log(lng);

    $( "input#lat" ).val( lat );

    $( "input#lng" ).val( lng );

}

/**
 * Sets the session values for UserLat and UserLong
 * @param position the position of the User
 */
function setPosition(position) {
    sessionStorage.setItem("userLat", position.coords.latitude);
    sessionStorage.setItem("userLong", position.coords.longitude);
}