/**
 * Gathers the user Latitude and Longitude values.
 * @params loggedIn a boolean for whether the User is logged in or not.
 */
function load(){
    if (sessionStorage.getItem("userLat") == null){
        getLocation();
    } else if(sessionStorage.getItem("userLong") == null){
        getLocation();
    }
}

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