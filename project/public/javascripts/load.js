/**
 * Gathers the user Latitude and Longitude values.
 * @params loggedIn a boolean for whether the User is logged in or not.
 */
function load(loggedIn){
    if (sessionStorage.getItem("userLat") == null){
        getLocation();
    } else if(sessionStorage.getItem("userLong") == null){
        getLocation();
    }
}