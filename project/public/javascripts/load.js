function load(loggedIn){
    if (sessionStorage.getItem("userLat") == null){
        getLocation();
    } else if(sessionStorage.getItem("userLong") == null){
        getLocation();
    }
}